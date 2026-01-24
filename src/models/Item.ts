import { Schema, Types, model, Document } from "mongoose";

export interface IItem extends Document {
  restaurant_id: Types.ObjectId;
  category_id: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  image: string;
  veg: boolean;
  status: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema(
  {
    restaurant_id: { type: Types.ObjectId, ref: "Restaurant", required: true },
    category_id: { type: Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    veg: { type: Boolean, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default model<IItem>("Item", ItemSchema);
