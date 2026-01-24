import { NextFunction, Request, Response } from "express";
import Item from "../models/Item";

export class ItemController {
  static async createItem(req: Request, res: Response, next: NextFunction) {
    const path = req.file?.path;
    const itemData = req.body;

    const restaurant_id = itemData.restaurant_id;
    const category_id = itemData.category_id;
    const name = itemData.name;
    const price = itemData.price;
    const veg = itemData.veg;
    const image = path;
    const status = itemData.status;

    let itemDoc: any = {
      restaurant_id,
      category_id,
      name,
      price,
      veg,
      image,
      status,
    };

    if (itemData.description) {
      itemDoc = { ...itemDoc, description: itemData.description };
    }

    const item = await new Item(itemDoc).save();

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  }

  static async getItems(req: Request, res: Response, next: NextFunction) {
    const { restaurantID } = req.params;
    try {
      const item = await Item.find({ restaurant_id: restaurantID }, { __v: 0 });
      res.status(200).json({
        message: "Categories fetched successfully",
        item,
      });
    } catch (err) {
      next(err);
    }
  }
}
