import { Schema, model, models } from "mongoose";

const vendorSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    defaultRate: {
      type: Number,
      min: 0,
      default: 0,
    },
    areaCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    areaName: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Vendor = models.Vendor || model("Vendor", vendorSchema);
