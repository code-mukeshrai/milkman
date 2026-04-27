import { Schema, model, models, Types } from "mongoose";

const deliveryExceptionSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["SKIP", "PAUSE"],
      required: true,
    },
  },
  {
    collection: "delivery_exceptions",
    timestamps: true,
  },
);

deliveryExceptionSchema.index({ customerId: 1, date: 1 }, { unique: true });

export const DeliveryException =
  models.DeliveryException ||
  model("DeliveryException", deliveryExceptionSchema);
