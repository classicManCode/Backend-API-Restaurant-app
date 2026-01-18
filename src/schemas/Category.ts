import { Schema, Types, model, Document } from "mongoose";

export interface ICategory extends Document {
  user_id: Types.ObjectId;
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);
