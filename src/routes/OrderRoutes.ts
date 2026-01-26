import { Router } from "express";
import { BannerValidator } from "../validators/BannerValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { BannerController } from "../controllers/BannerController";
import { Utils } from "../utils/Utils";
import { OrderController } from "../controllers/OrderController";
import { OrderValidator } from "../validators/OrderValidator";

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
      "/fetch-orders",
      GlobalMiddleWares.auth,
      OrderController.getOrders
    );
  }
  POST() {
    this.router.post(
      "/create-order",
      GlobalMiddleWares.auth,
      OrderValidator.createOrder(),
      GlobalMiddleWares.checkError,
      OrderController.createOrder
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new BannerRoutes().router;
