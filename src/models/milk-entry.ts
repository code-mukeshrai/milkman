import { Schema, model, models, Types } from "mongoose";

const milkEntrySchema = new Schema(
  {
    vendorId: {
      type: Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    vendorCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
      required: true,
    },
  },
  {
    collection: "milk_entries",
    timestamps: true,
  },
);

milkEntrySchema.index({ vendorId: 1, date: -1 });

export const MilkEntry = models.MilkEntry || model("MilkEntry", milkEntrySchema);
