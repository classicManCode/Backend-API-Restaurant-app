import { Router } from "express";
import { CategoryValidator } from "../validators/CategoryValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CategoryController } from "../controllers/CategoryController";
import { Utils } from "../utils/Utils";

class CategoryRoutes {
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
      "/categories/:restaurantID",GlobalMiddleWares.auth,
      CategoryController.getCategoriesByRestaurant
    );
  }
  POST() {
    this.router.post(
      "/create",
      CategoryValidator.createBanner(),
      GlobalMiddleWares.checkError,
      CategoryController.createCategory
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new CategoryRoutes().router;
