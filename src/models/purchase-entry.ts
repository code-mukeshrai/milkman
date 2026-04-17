import { Schema, model, models, Types } from "mongoose";

const purchaseEntrySchema = new Schema(
  {
    vendorId: {
      type: Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    vendorCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: String,
      enum: ["MILK", "DAIRY_ADDON", "OTHER"],
      required: true,
      default: "MILK",
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      default: "L",
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
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PARTIAL", "PAID"],
      default: "UNPAID",
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PurchaseEntry =
  models.PurchaseEntry || model("PurchaseEntry", purchaseEntrySchema);
