import { body, query } from "express-validator";
import Restaurant from "../models/Restaurant";

export class OrderValidator {
  static createOrder() {
    return [
      body("restaurant_id")
        .notEmpty()
        .withMessage("Order name is required")
        .custom(async (restaurant_id, { req }) => {
          const restaurant = await Restaurant.findById(restaurant_id);
          if (!restaurant) {
            throw new Error("Invalid Restaurant ID");
          }
          req.restaurant = restaurant;
          return true;
        }),
      body("status")
        .notEmpty()
        .withMessage("Order name is required")
        .isString()
        .isIn(["pending", "delivered"])
        .withMessage("Invalid status"),
      body("order").notEmpty().withMessage("Order item is required").isString(),
      body("address").notEmpty().withMessage("Order address is required").isString(),
      body("total").notEmpty().withMessage("Order total is required").isString(),
      body("deliveryCharges").notEmpty().withMessage("Order delivery charges is required").isString(),
      body("grandTotal").notEmpty().withMessage("Order grand total is required").isString(),
      body("paymentMode")
        .notEmpty()
        .withMessage("Order name is required")
        .isString()
        .isIn(["cash", "online"])
        .withMessage("Invalid payment mode"),
      body("paymentStatus")
        .notEmpty()
        .withMessage("Order name is required")
        .isString()
        .isIn(["pending", "accepted", "rejected", "completed"])
        .withMessage("Invalid payment status"),
    ];
  }
}
