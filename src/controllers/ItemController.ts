import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";

export class ItemController {
  static async createItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}

  static async getCategoriesByRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { restaurantID } = req.params;
    try {
      const item = await Item.find(
        { restaurant_id: restaurantID },
        { __v: 0 },
      );
      res.status(200).json({
        message: "Categories fetched successfully",
        item,
      });
    } catch (err) {
      next(err);
    }
  }
}
