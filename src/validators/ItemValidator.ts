import { body, query } from "express-validator";

export class ItemValidator {
  static createItem() {
    return [
      body("name").notEmpty().withMessage("Item name is required"),
      body("price").notEmpty().withMessage("Item price is required"),
      body("description").notEmpty().withMessage("Item description is required"),
      body("status").notEmpty().withMessage("Item status is required"),
    ];
  }
}
