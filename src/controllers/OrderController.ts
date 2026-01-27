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
        restaurant_id,
        orders: JSON.parse(orderData.orders),
        address: JSON.parse(orderData.address),
        status: "pending",
        total: orderData.total,
        deliveryCharges: orderData.deliveryCharges,
        grandTotal: orderData.grandTotal,
        paymentMode: orderData.paymentMode,
        paymentStatus: orderData.paymentStatus,
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
    const user_id = (req as any).user.aud;
    const order = await Order.find({ user_id }, { user_id: 0, __v: 0 })
      .populate(
        "restaurant_id",
        // "address name"
      )
      .exec();
    res.status(201).json({
      message: "Orders fetched successfully",
      customerOrder: order,
    });
  }
}
