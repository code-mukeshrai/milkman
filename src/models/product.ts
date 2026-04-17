import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
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
    category: {
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
    defaultRate: {
      type: Number,
      required: true,
      min: 0,
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

export const Product = models.Product || model("Product", productSchema);
