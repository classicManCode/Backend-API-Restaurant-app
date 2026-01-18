import { Router } from "express";
import { BannerValidator } from "../validators/BannerValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { BannerController } from "../controllers/BannerController";
import { Utils } from "../utils/Utils";

class BannerRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.GET();
    this.POST();
    this.PUT();
    this.PATCH();
    this.DELETE();
  }
  GET() {
    this.router.get(
      "/banners",
      GlobalMiddleWares.auth,
      BannerController.getBanners
    );
  }
  POST() {
    this.router.post(
      "/create",
      GlobalMiddleWares.auth,
      GlobalMiddleWares.adminRole,
      new Utils().multer.single("banner"),
      BannerValidator.createBanner(),
      GlobalMiddleWares.checkError,
      BannerController.createBanner
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new BannerRoutes().router;
