import { Router } from "express";
import { ItemValidator } from "../validators/ItemValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { ItemController } from "../controllers/ItemController";
import { Utils } from "../utils/Utils";

class ItemRoutes {
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
    this.router.get("/cities", ItemController.getItems);
  }
  POST() {
    this.router.post(
      "/create-item",
      GlobalMiddleWares.auth,
      GlobalMiddleWares.adminRole,
      new Utils().multer.single("itemImages"),
      ItemValidator.createItem(),
      GlobalMiddleWares.checkError,
      ItemController.createItem,
    );
  }
  PUT() {}
  PATCH() {}
  DELETE() {}
}
export default new ItemRoutes().router;
