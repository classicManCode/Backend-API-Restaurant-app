import { Schema, Types, model, Document } from "mongoose";
import { ref } from "node:process";

export interface ICategory extends Document {
  restaurant_id: Types.ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    restaurant_id: { type: Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export default model("Category", CategorySchema);
