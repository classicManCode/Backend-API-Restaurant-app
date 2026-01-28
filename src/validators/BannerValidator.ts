import { body, query } from "express-validator";

export class BannerValidator {
  static createBanner() {
    return [
      body("banner").custom(async(banner, { req }) => {
        if (!req.file) {
          throw new Error("File not uploaded");
        }
        return true;
      }),
    ];
  }
}
