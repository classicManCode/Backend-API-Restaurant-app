import { Router } from "express";
import { CityValidator } from "../validators/CityValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CityController } from "../controllers/CityController";
import { Utils } from "../utils/Utils";

class CityRoutes {
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
      "/cities",
      CityController.getCities
    );
  }
  POST() {
    this.router.post(
      "/create",
      CityValidator.createCity(),
      GlobalMiddleWares.checkError,
      CityController.createCity
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new CityRoutes().router;
