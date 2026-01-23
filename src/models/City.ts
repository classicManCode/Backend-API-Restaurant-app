import { model, Schema, Document } from "mongoose";

interface ICity extends Document {
  name: string;
  lat: number;
  lng: number;
  status: string;
}

const CitySchema = new Schema(
  {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ICity>("City", CitySchema);
