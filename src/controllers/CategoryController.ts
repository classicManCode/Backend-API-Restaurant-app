import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";

export class CategoryController {
  static async createCategory(
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
      const category = await Category.find(
        { restaurant_id: restaurantID },
        { __v: 0 },
      );
      res.status(200).json({
        message: "Categories fetched successfully",
        category,
      });
    } catch (err) {
      next(err);
    }
  }
}
