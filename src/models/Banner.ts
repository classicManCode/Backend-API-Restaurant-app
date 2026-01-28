import { Schema, model, Document, Types } from "mongoose";

interface IBanner extends Document {
  restaurant_id?: Types.ObjectId;
  banner: string;
  status: boolean;
}

const BannerSchema = new Schema(
  {
    restaurant_id: { type: Types.ObjectId, ref: "Restaurant" },
    banner: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export default model<IBanner>("Banner", BannerSchema);
