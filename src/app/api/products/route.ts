import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { normalizeAreaCode } from "@/lib/areas";
import { Product } from "@/models/product";

const productSchema = z.object({
  code: z.string().trim().optional(),
  name: z.string().trim().min(2),
  category: z.enum(["MILK", "DAIRY_ADDON", "OTHER"]),
  unit: z.string().trim().min(1),
  defaultRate: z.number().nonnegative(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  await connectToDatabase();
  const products = await Product.find().sort({ sortOrder: 1, name: 1 }).lean();

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = productSchema.parse(await request.json());
    const code = normalizeAreaCode(payload.code || payload.name);

    const existing = await Product.findOne({ code }).lean();

    if (existing) {
      return NextResponse.json({ error: "Product code already exists" }, { status: 409 });
    }

    const product = await Product.create({
      ...payload,
      code,
      isActive: payload.isActive ?? true,
      sortOrder: await Product.countDocuments(),
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
