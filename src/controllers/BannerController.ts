import { NextFunction, Request, Response } from "express";
import Banner from "../models/Banner";

export class BannerController {
  static async createBanner(req: Request, res: Response, next: NextFunction) {
    const path = (req as any).file.path;
    const restaurant_id = (req as any).body.restaurant_id;
    try {
      let data: any = {
        banner: path,
      };
      if (restaurant_id) {
        data = { ...data, restaurant_id };
      }
      const banner = await new Banner(data).save();
      res.status(200).json({
        message: "Banner created successfully",
        banner,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBanners(req: Request, res: Response, next: NextFunction) {
    const banner = await Banner.find({ status: true });
    res.status(200).send(banner);
  }
}
