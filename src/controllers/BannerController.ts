import { NextFunction, Request, Response } from "express";
import Banner from "../schemas/Banner";

export class BannerController {
  static async createBanner(req: Request, res: Response, next: NextFunction) {
    const path = (req as any).file.path;
    try {
      const data = {
        banner: path,
      };
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
