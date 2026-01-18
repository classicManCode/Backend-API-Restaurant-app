import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  email_verified: boolean;
  verification_token: string;
  verification_token_time: Date;
  phone: string;
  password: string;
  reset_password_token: string;
  reset_password_token_time: Date;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, required: true, default: false },
    verification_token: { type: String, required: true },
    verification_token_time: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reset_password_token: { type: String },
    reset_password_token_time: { type: Date },
    type: {
      type: String,
      required: true,
      enum: ["user", "admin", "restaurant"],
    },
    status: { type: String, required: true, enum: ["active", "inactive"] },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
