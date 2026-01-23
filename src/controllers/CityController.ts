import { NextFunction, Request, Response } from "express";
import City from "../models/City";

export class CityController {
  static async createCity(req: Request, res: Response, next: NextFunction) {
    const path = (req as any).file.path;
    try {
      const data = {
        City: path,
      };
      const city = await new City(data).save();
      res.status(200).json({
        message: "City created successfully",
        city,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const city = await City.find({ status: "active" });
      res.json({
        message: "Cities fetched successfully",
        city,
      });
    } catch (err) {
      next(err);
    }
  }
}
