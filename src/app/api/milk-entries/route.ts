import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connect";
import { MilkEntry } from "@/models/milk-entry";
import { Vendor } from "@/models/vendor";

const milkEntrySchema = z.object({
  vendorCode: z.string().trim().min(1),
  date: z.string().trim().min(1),
  quantity: z.number().positive(),
  rate: z.number().nonnegative(),
  status: z.enum(["PAID", "UNPAID"]).optional(),
});

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const vendorCode = request.nextUrl.searchParams.get("vendorCode")?.trim() || "";
  const dateFrom = request.nextUrl.searchParams.get("dateFrom")?.trim() || "";
  const dateTo = request.nextUrl.searchParams.get("dateTo")?.trim() || "";

  const query: Record<string, unknown> = {};

  if (vendorCode) {
    query.vendorCode = vendorCode;
  }

  if (dateFrom || dateTo) {
    query.date = {};

    if (dateFrom) {
      query.date = {
        ...(query.date as object),
        $gte: startOfDay(new Date(dateFrom)),
      };
    }

    if (dateTo) {
      query.date = {
        ...(query.date as object),
        $lte: endOfDay(new Date(dateTo)),
      };
    }
  }

  const [entries, summaryResult] = await Promise.all([
    MilkEntry.find(query).sort({ date: -1, createdAt: -1 }).lean(),
    MilkEntry.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalMilk: { $sum: "$quantity" },
          totalAmount: { $sum: "$total" },
          totalUnpaid: {
            $sum: {
              $cond: [{ $eq: ["$status", "UNPAID"] }, "$total", 0],
            },
          },
        },
      },
    ]),
  ]);

  const summary = summaryResult[0] || {
    totalMilk: 0,
    totalAmount: 0,
    totalUnpaid: 0,
  };

  return NextResponse.json({
    entries: entries.map((entry) => ({
      id: String(entry._id),
      vendorCode: entry.vendorCode,
      vendorName: entry.vendorName,
      date: new Date(entry.date).toISOString().slice(0, 10),
      dateLabel: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(entry.date)),
      quantity: entry.quantity,
      rate: entry.rate,
      total: entry.total,
      status: entry.status,
    })),
    summary,
  });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = milkEntrySchema.parse(await request.json());
    const vendor = await Vendor.findOne({ code: payload.vendorCode }).lean();

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const quantity = payload.quantity;
    const rate = payload.rate;
    const total = quantity * rate;

    const entry = await MilkEntry.create({
      vendorId: vendor._id,
      vendorCode: vendor.code,
      vendorName: vendor.name,
      date: new Date(payload.date),
      quantity,
      rate,
      total,
      status: payload.status ?? "UNPAID",
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to save milk entry" }, { status: 500 });
  }
}
