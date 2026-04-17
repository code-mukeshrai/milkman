import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { Area } from "@/models/area";
import { CustomerProfile } from "@/models/customer-profile";
import { Delivery } from "@/models/delivery";
import { MilkPlan } from "@/models/milk-plan";
import { Payment } from "@/models/payment";
import { User } from "@/models/user";

const customerSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(8),
  preferredLanguage: z.enum(["en", "hi"]).optional(),
  addressLine1: z.string().trim().min(3),
  addressLine2: z.string().trim().optional(),
  areaCode: z.string().trim().min(1),
  landmark: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  quantityLiters: z.number().positive(),
  pricePerLiter: z.number().nonnegative(),
  unitLabel: z.string().trim().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PAUSED"]).optional(),
});

type RouteContext = {
  params: Promise<{ customerCode: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  await connectToDatabase();
  const { customerCode } = await context.params;
  const profile = await CustomerProfile.findOne({ customerCode }).lean();

  if (!profile) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json({ customer: profile });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await connectToDatabase();
    const { customerCode } = await context.params;
    const payload = customerSchema.parse(await request.json());
    const profile = await CustomerProfile.findOne({ customerCode });

    if (!profile) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const area = await Area.findOne({ code: payload.areaCode }).lean();
    if (!area) {
      return NextResponse.json({ error: "Area not found" }, { status: 404 });
    }

    const user = await User.findById(profile.userId);
    if (!user) {
      return NextResponse.json({ error: "Linked user not found" }, { status: 404 });
    }

    const duplicatePhone = await User.findOne({
      phone: payload.phone,
      _id: { $ne: user._id },
    }).lean();

    if (duplicatePhone) {
      return NextResponse.json({ error: "Phone is already linked to another customer" }, { status: 409 });
    }

    user.name = payload.name;
    user.phone = payload.phone;
    user.preferredLanguage = payload.preferredLanguage ?? user.preferredLanguage;
    user.status = payload.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";
    await user.save();

    profile.addressLine1 = payload.addressLine1;
    profile.addressLine2 = payload.addressLine2 || "";
    profile.areaCode = area.code;
    profile.areaName = area.name;
    profile.area = area.name;
    profile.landmark = payload.landmark || "";
    profile.notes = payload.notes || "";
    profile.isActive = payload.status !== "INACTIVE";
    await profile.save();

    const plan =
      (await MilkPlan.findOne({ customerId: profile._id, isActive: true }).sort({ startDate: -1 })) ||
      new MilkPlan({
        customerId: profile._id,
        startDate: new Date(),
        isActive: true,
      });

    plan.quantityLiters = payload.quantityLiters;
    plan.pricePerLiter = payload.pricePerLiter;
    plan.unitLabel = payload.unitLabel || "L";
    await plan.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  await connectToDatabase();
  const { customerCode } = await context.params;
  const profile = await CustomerProfile.findOne({ customerCode });

  if (!profile) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  await Promise.all([
    Delivery.deleteMany({ customerId: profile._id }),
    Payment.deleteMany({ customerId: profile._id }),
    MilkPlan.deleteMany({ customerId: profile._id }),
    User.findByIdAndDelete(profile.userId),
    CustomerProfile.deleteOne({ _id: profile._id }),
  ]);

  return NextResponse.json({ ok: true });
}
