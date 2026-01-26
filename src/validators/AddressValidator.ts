import { body, query } from "express-validator";

export class AddressValidator {
  static createAddress() {
    return [
      body("title", "Title is required")
        .isString()
        .withMessage("Title must be a string"),
      body("address", "Address is required")
        .isString()
        .withMessage("Address must be a string"),
      body("houseNumber", "House number is required")
        .isString()
        .withMessage("House number must be a string"),
      body("landmark", "Landmark is required")
        .isString()
        .withMessage("Landmark must be a string"),
      body("lat", "Latitude is required")
        .isNumeric()
        .withMessage("Latitude must be a number"),
      body("lng", "Longitude is required")
        .isNumeric()
        .withMessage("Longitude must be a number"),
    ];
  }



  static editAddress() {
    return [
      body("title", "Title is required")
        .isString()
        .withMessage("Title must be a string"),
      body("address", "Address is required")
        .isString()
        .withMessage("Address must be a string"),
      body("houseNumber", "House number is required")
        .isString()
        .withMessage("House number must be a string"),
      body("landmark", "Landmark is required")
        .isString()
        .withMessage("Landmark must be a string"),
      body("lat", "Latitude is required")
        .isNumeric()
        .withMessage("Latitude must be a number"),
      body("lng", "Longitude is required")
        .isNumeric()
        .withMessage("Longitude must be a number"),
    ];
  }

  static checkAddress() {
    return [
      query("lat", "Latitude is required")
        .isNumeric()
        .withMessage("Latitude must be a number"),
      query("lng", "Longitude is required")
        .isNumeric()
        .withMessage("Longitude must be a number"),
    ];
  }

  static getLimitedAddress() {
    return [
      query("limit", "Limit is required")
        .isNumeric()
        .withMessage("Limit must be a number"),
    ];
  }
  
}
