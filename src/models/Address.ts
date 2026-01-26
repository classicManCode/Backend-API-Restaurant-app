import { Schema, model, Document, Types } from "mongoose";

export interface IAddress {
  user_id: Types.ObjectId;
  title: string;
  address: string;
  houseNumber: string;
  landmark: string;
  lat: number;
  lng: number;
}

export interface IAddressDocument extends IAddress, Document {}

const AddressSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    houseNumber: { type: String, required: true },
    landmark: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<IAddressDocument>("Address", AddressSchema);
