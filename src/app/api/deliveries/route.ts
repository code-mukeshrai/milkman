import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { CustomerProfile } from "@/models/customer-profile";
import { Delivery } from "@/models/delivery";
import { MilkPlan } from "@/models/milk-plan";
import { Product } from "@/models/product";

const deliveryItemSchema = z.object({
  productCode: z.string().trim().min(1),
  quantity: z.number().positive(),
});

const deliverySchema = z.object({
  customerCode: z.string().trim().min(1),
  status: z.enum(["DELIVERED", "SKIPPED", "PAUSED"]),
  extraQuantity: z.number().nonnegative().optional(),
  finalQuantity: z.number().nonnegative().optional(),
  note: z.string().trim().optional(),
  items: z.array(deliveryItemSchema).optional(),
  date: z.string().trim().optional(),
});

export async function GET() {
  await connectToDatabase();
  const deliveries = await Delivery.find().sort({ date: -1, createdAt: -1 }).lean();
  return NextResponse.json({ deliveries });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = deliverySchema.parse(await request.json());
    const [customer, plan] = await Promise.all([
      CustomerProfile.findOne({ customerCode: payload.customerCode }).lean(),
      CustomerProfile.findOne({ customerCode: payload.customerCode })
        .lean()
        .then((profile) =>
          profile
            ? MilkPlan.findOne({ customerId: profile._id, isActive: true }).sort({ startDate: -1 }).lean()
            : null,
        ),
    ]);

    if (!customer || !plan) {
      return NextResponse.json({ error: "Customer or active milk plan not found" }, { status: 404 });
    }

    const targetDate = payload.date ? new Date(payload.date) : new Date();
    const dayStart = new Date(targetDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(targetDate);
    dayEnd.setHours(23, 59, 59, 999);

    const products = payload.items?.length
      ? await Product.find({ code: { $in: payload.items.map((item) => item.productCode) } }).lean()
      : [];

    const itemEntries = (payload.items || []).map((item) => {
      const product = products.find((entry) => entry.code === item.productCode);

      if (!product) {
        throw new Error(`Product ${item.productCode} not found`);
      }

      return {
        productId: product._id,
        productCode: product.code,
        productName: product.name,
        category: product.category,
        unit: product.unit,
        quantity: item.quantity,
        rate: product.defaultRate,
        totalAmount: item.quantity * product.defaultRate,
      };
    });

    const baseQuantity = plan.quantityLiters;
    const extraQuantity = payload.extraQuantity ?? 0;
    const finalQuantity =
      payload.status === "DELIVERED"
        ? payload.finalQuantity ?? baseQuantity + extraQuantity
        : 0;

    const delivery =
      (await Delivery.findOne({
        customerId: customer._id,
        date: { $gte: dayStart, $lte: dayEnd },
      })) ||
      new Delivery({
        customerId: customer._id,
        date: targetDate,
      });

    delivery.status = payload.status;
    delivery.baseQuantity = baseQuantity;
    delivery.extraQuantity = extraQuantity;
    delivery.finalQuantity = finalQuantity;
    delivery.quantityDelivered = finalQuantity;
    delivery.pricePerLiter = plan.pricePerLiter;
    delivery.note = payload.note || "";
    delivery.items = itemEntries;
    await delivery.save();

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
