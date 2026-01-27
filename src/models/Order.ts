import { Schema, Types, model, Document } from "mongoose";

export interface IOrder {
  user_id: Types.ObjectId;
  restaurant_id: Types.ObjectId;
  orders: any[];
  instructions?: string;
  address: object;
  status: string;
  total: string;
  deliveryCharges: string;
  grandTotal: string;
  paymentMode: string;
  paymentStatus: string;
}

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    restaurant_id: { type: Types.ObjectId, ref: "Restaurant", required: true },
    orders: { type: Array, required: true },
    instructions: { type: String },
    address: { type: Object, required: true },
    status: {
      type: String,
      enum: ["delivered", "pending"],
      required: true,
      default: "pending",
    },
    total: { type: Number, required: true },
    deliveryCharges: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IOrder>("Order", OrderSchema);
