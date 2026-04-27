import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { getDeliveryRunData } from "@/lib/data-service";
import { CustomerProfile } from "@/models/customer-profile";
import { Delivery } from "@/models/delivery";
import { DeliveryException } from "@/models/delivery-exception";
import { MilkPlan } from "@/models/milk-plan";

const deliverySchema = z.object({
  customerCode: z.string().trim().min(1),
  type: z.enum(["DELIVERED", "SKIPPED", "PAUSED", "SKIP", "PAUSE"]).optional(),
  status: z.enum(["DELIVERED", "SKIPPED", "PAUSED"]).optional(),
  extraQuantity: z.number().nonnegative().optional(),
  finalQuantity: z.number().nonnegative().optional(),
  note: z.string().trim().optional(),
  date: z.string().trim().optional(),
}).refine((value) => value.type || value.status, {
  message: "Delivery status is required",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "ALL";
  const entries = await getDeliveryRunData({
    date: searchParams.get("date") || undefined,
    areaCode: searchParams.get("area") || undefined,
    status:
      status === "DELIVERED" || status === "SKIPPED" || status === "PAUSED" || status === "PENDING"
        ? status
        : "ALL",
  });

  return NextResponse.json({
    entries,
    counts: {
      delivered: entries.filter((entry) => entry.status === "DELIVERED").length,
      skipped: entries.filter((entry) => entry.status === "SKIPPED").length,
      paused: entries.filter((entry) => entry.status === "PAUSED").length,
      pending: entries.filter((entry) => entry.status === "PENDING").length,
    },
  });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = deliverySchema.parse(await request.json());
    const customer = await CustomerProfile.findOne({ customerCode: payload.customerCode }).lean();

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const targetDate = payload.date ? new Date(payload.date) : new Date();
    const dayStart = new Date(targetDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(targetDate);
    dayEnd.setHours(23, 59, 59, 999);
    const requestedStatus = payload.type || payload.status;
    if (!requestedStatus) {
      return NextResponse.json({ error: "Delivery status is required" }, { status: 400 });
    }
    const status =
      requestedStatus === "SKIP"
        ? "SKIPPED"
        : requestedStatus === "PAUSE"
          ? "PAUSED"
          : requestedStatus;
    const activePlan = await MilkPlan.findOne({ customerId: customer._id, isActive: true })
      .sort({ startDate: -1 })
      .lean<{ quantityLiters?: number; pricePerLiter?: number } | null>();
    const baseQuantity = activePlan?.quantityLiters || 0;
    const extraQuantity = payload.extraQuantity || 0;
    const quantity =
      status === "DELIVERED" ? payload.finalQuantity ?? baseQuantity + extraQuantity : 0;

    const delivery =
      (await Delivery.findOne({
        customerId: customer._id,
        date: { $gte: dayStart, $lte: dayEnd },
      })) ||
      new Delivery({
        customerId: customer._id,
        date: targetDate,
      });

    delivery.status = status;
    delivery.quantityDelivered = quantity;
    delivery.baseQuantity = baseQuantity;
    delivery.extraQuantity = extraQuantity;
    delivery.finalQuantity = quantity;
    delivery.pricePerLiter = activePlan?.pricePerLiter || 0;
    delivery.note = payload.note || "";
    await delivery.save();

    if (status === "DELIVERED") {
      await DeliveryException.deleteOne({
        customerId: customer._id,
        date: { $gte: dayStart, $lte: dayEnd },
      });
    } else {
      const exception =
        (await DeliveryException.findOne({
          customerId: customer._id,
          date: { $gte: dayStart, $lte: dayEnd },
        })) ||
        new DeliveryException({
          customerId: customer._id,
          date: targetDate,
        });

      exception.type = status === "PAUSED" ? "PAUSE" : "SKIP";
      await exception.save();
    }

    return NextResponse.json({ delivery });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save delivery" },
      { status: 500 },
    );
  }
}
