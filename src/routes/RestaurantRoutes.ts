import { Router } from "express";
import { RestaurantValidator } from "../validators/RestaurantValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { RestaurantController } from "../controllers/RestaurantController";
import { Utils } from "../utils/Utils";

class RestaurantRoutes {
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
    // this.router.get("/restaurants", RestaurantController.getRestaurants);
    this.router.get("/nearbyRestaurants",GlobalMiddleWares.auth,RestaurantValidator.getNearbyRestaurants(),GlobalMiddleWares.checkError, RestaurantController.getNearbyRestaurants);

    this.router.get("/searchNearbyRestaurants",GlobalMiddleWares.auth,RestaurantValidator.searchNearbyRestaurants(),GlobalMiddleWares.checkError, RestaurantController.searchNearbyRestaurants);
  }
  POST() {
    this.router.post(
      "/create",
      GlobalMiddleWares.auth,
      GlobalMiddleWares.adminRole,
      new Utils().multer.single("restaurantImages"),
      RestaurantValidator.createRestaurant(),
      GlobalMiddleWares.checkError,
      RestaurantController.createRestaurant
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new RestaurantRoutes().router;
