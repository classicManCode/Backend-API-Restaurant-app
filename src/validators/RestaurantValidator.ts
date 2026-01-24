import { body, query } from "express-validator";
import User from "../models/User";

export class RestaurantValidator {
  static createRestaurant() {
    return [
      body("name").notEmpty().withMessage("Name is required").isString(),
      body("city_id").notEmpty().withMessage("City ID is required"),
      body("res_name").notEmpty().withMessage("Restaurant name is required"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid Email")
        .normalizeEmail()
        .custom(async (email, { req }) => {
          const user = await User.findOne({ email: email });
          if (user) throw new Error("Email is already registered");
          // req.user = user;
          return true;
        }),
      body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isString(),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString(),
      body("short_name")
        .notEmpty()
        .withMessage("Short name is required")
        .isString(),
      body("restaurantImages", "Restaurant image is required").custom(
        async (restaurantImages, { req }) => {
          if (!req.file) throw new Error("File not uploaded");
          return true;
        },
      ),
      body("address").notEmpty().withMessage("Address is required").isString(),
      body("location")
        .notEmpty()
        .withMessage("Location is required")
        .isString(),
      body("categories")
        .notEmpty()
        .withMessage("Categories is required")
        .isString(),
      body("cuisines")
        .notEmpty()
        .withMessage("Cuisines are required")
        .isString(),
      body("price").notEmpty().withMessage("Price is required").isNumeric(),
      body("openTime")
        .notEmpty()
        .withMessage("Open time is required")
        .isString(),
      body("closeTime")
        .notEmpty()
        .withMessage("Close time is required")
        .isString(),
      body("deliveryTime")
        .notEmpty()
        .withMessage("Delivery time is required")
        .isString(),
      body("status").notEmpty().withMessage("Status is required").isString(),
    ];
  }

  static getNearbyRestaurants() {
    return [
      query("lat").notEmpty().withMessage("Latitude is required").isNumeric(),
      query("lng").notEmpty().withMessage("Longitude is required").isNumeric(),
      query("radius").notEmpty().withMessage("Radius is required").isNumeric(),
    ];
  }
  static searchNearbyRestaurants() {
    return [
      query("name").notEmpty().withMessage("Name is required").isString(),
      query("lat").notEmpty().withMessage("Latitude is required").isNumeric(),
      query("lng").notEmpty().withMessage("Longitude is required").isNumeric(),
      query("radius").notEmpty().withMessage("Radius is required").isNumeric(),
    ];
  }
}
