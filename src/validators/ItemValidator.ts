import { body, param, query } from "express-validator";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";

export class ItemValidator {
  static createItem() {
    return [
      body("name").notEmpty().withMessage("Item name is required"),
      body("price").notEmpty().withMessage("Item price is required"),
      body("description")
        .notEmpty()
        .withMessage("Item description is required"),
      body("status")
        .notEmpty()
        .withMessage("Item status is required")
        .isBoolean(),
      body("veg").notEmpty().withMessage("Item veg is required").isBoolean(),
      body("itemImages", "Item image is required").custom(
        async (itemImage, { req }) => {
          if (!req.file) {
            throw new Error("Item image was not uploaded");
          }
          return true;
        },
      ),
      body("restaurant_id")
        .notEmpty()
        .withMessage("Item restaurant_id is required")
        .isString()
        .withMessage("Item restaurant_id must be a string")
        .custom(async (restaurant_id, { req }) => {
          const restaurant = await Restaurant.findById(restaurant_id);
          if (!restaurant) {
            throw new Error("Invalid Restaurant ID");
          }
          return true;
        }),
      body("category_id")
        .notEmpty()
        .withMessage("Item category_id is required")
        .isString()
        .withMessage("Item category_id must be a string")
        .custom(async (category_id, { req }) => {
          const category = await Category.findById(category_id);
          if (!category) {
            throw new Error("Invalid Category ID");
          }
          return true;
        }),
    ];
  }

  static getMenuItems() {
    return [
      param("restaurantID")
        .notEmpty()
        .withMessage("Restaurant ID is required")
        .isMongoId()
        .withMessage("Invalid Restaurant ID")
        .custom(async (restaurantID, { req }) => {
          const restaurant = await Restaurant.findById(restaurantID);
          if (!restaurant) throw new Error("This restaurant does not exist");
          req.restaurant = restaurant;
          return true;
        }),
    ];
  }
}
