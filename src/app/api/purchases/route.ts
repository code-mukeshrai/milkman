import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { Product } from "@/models/product";
import { PurchaseEntry } from "@/models/purchase-entry";
import { Vendor } from "@/models/vendor";

const purchaseSchema = z.object({
  vendorCode: z.string().trim().min(1),
  productCode: z.string().trim().min(1),
  quantity: z.number().positive(),
  rate: z.number().nonnegative(),
  paymentStatus: z.enum(["UNPAID", "PARTIAL", "PAID"]).optional(),
  note: z.string().trim().optional(),
  date: z.string().trim().optional(),
});

export async function GET() {
  await connectToDatabase();
  const purchases = await PurchaseEntry.find().sort({ date: -1, createdAt: -1 }).lean();
  return NextResponse.json({ purchases });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = purchaseSchema.parse(await request.json());
    const [vendor, product] = await Promise.all([
      Vendor.findOne({ code: payload.vendorCode }).lean(),
      Product.findOne({ code: payload.productCode }).lean(),
    ]);

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const purchase = await PurchaseEntry.create({
      vendorId: vendor._id,
      vendorCode: vendor.code,
      vendorName: vendor.name,
      productId: product._id,
      productCode: product.code,
      productName: product.name,
      productCategory: product.category,
      unit: product.unit,
      quantity: payload.quantity,
      rate: payload.rate,
      totalAmount: payload.quantity * payload.rate,
      paymentStatus: payload.paymentStatus ?? "UNPAID",
      note: payload.note || "",
      date: payload.date ? new Date(payload.date) : new Date(),
    });

    return NextResponse.json({ purchase }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create purchase entry" }, { status: 500 });
  }
}
