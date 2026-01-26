import { NextFunction, Request, Response } from "express";
import Order, { IOrder } from "../models/Order";
import Restaurant from "../models/Restaurant";
import Address from "../models/Address";
import Item from "../models/Item";

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    const user_id = (req as any).user.aud;
    const restaurant_id = (req as any).restaurant;
    const orderData = req.body;

    try {
      let orderDoc: IOrder = {
        user_id,
        ...orderData,
        restaurant_id,
        orders: JSON.parse(orderData.order),
        address: JSON.parse(orderData.address),
        // orderItems: orderData.orderItems,
        // address: orderData.address,
      };
      if (orderData.instructions) {
        orderDoc = { ...orderDoc, instructions: orderData.instructions };
      }
      const order = await new Order(orderDoc).save();
      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction) {
    const order = await Order.find({});
    res.status(200).send(order);
  }
}
