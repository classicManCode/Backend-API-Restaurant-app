import { body, query } from "express-validator";

export class CategoryValidator {
  static createBanner() {
    return [
      body("name").notEmpty().withMessage("City name is required"),
      body("lat").notEmpty().withMessage("City name is required"),
      body("lng").notEmpty().withMessage("City name is required"),
      body("status").notEmpty().withMessage("City name is required"),
    ];
  }
}
