import { Schema, model, Document } from "mongoose";

interface IBanner extends Document {
  banner: string,
  status: boolean
}

const BannerSchema = new Schema(
  {
    banner: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default model<IBanner>("Banner", BannerSchema);
