import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { CustomerProfile } from "@/models/customer-profile";
import { Payment } from "@/models/payment";

const paymentSchema = z.object({
  customerCode: z.string().trim().min(1),
  amount: z.number().positive(),
  mode: z.enum(["CASH", "UPI", "BANK"]),
  note: z.string().trim().optional(),
  date: z.string().trim().optional(),
});

export async function GET() {
  await connectToDatabase();
  const payments = await Payment.find().sort({ date: -1, createdAt: -1 }).lean();
  return NextResponse.json({ payments });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = paymentSchema.parse(await request.json());
    const customer = await CustomerProfile.findOne({ customerCode: payload.customerCode }).lean();

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const payment = await Payment.create({
      customerId: customer._id,
      amount: payload.amount,
      mode: payload.mode,
      note: payload.note || "",
      date: payload.date ? new Date(payload.date) : new Date(),
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
