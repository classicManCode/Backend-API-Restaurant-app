import { model, Schema, Types, Document } from "mongoose";

interface IRestaurant extends Document {
  user_id: Types.ObjectId;
  city_id: Types.ObjectId;
  name: string;
  short_name: string;
  description: string;
  coverImage: string;
  address: string;
  location: string;
  cuisines: string;
  price: string;
  openTime: string;
  closeTime: string;
  deliveryTime: string;
  rating: string;
  totalRating: string;
  isClosed: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const RestaurantSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true },
    city_id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    short_name: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: Object, required: true },
    cuisines: { type: Array, required: true },
    price: { type: Number, required: true },
    openTime: { type: Date, required: true },
    closeTime: { type: Date, required: true },
    deliveryTime: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    totalRating: { type: Number, required: true, default: 0 },
    isClosed: { type: Boolean, required: true, default: false },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IRestaurant>("Restaurant", RestaurantSchema);
