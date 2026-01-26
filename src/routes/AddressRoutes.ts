import { Router } from "express";
import { AddressValidator } from "../validators/AddressValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { AddressController } from "../controllers/AddressController";
import { Utils } from "../utils/Utils";

class AddressRoutes {
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
      "/get-address",
      GlobalMiddleWares.auth,
      AddressController.getAddress,
    );

    // this.router.get(
    //   "/:id",
    //   GlobalMiddleWares.auth,
    //   AddressController.getAddressById,
    // );

    this.router.get(
      "/check-address",
      GlobalMiddleWares.auth,
      AddressValidator.checkAddress(),
      GlobalMiddleWares.checkError,
      AddressController.checkAddress,
    );

    this.router.get(
      "/limited-address",
      GlobalMiddleWares.auth,
      AddressValidator.getLimitedAddress(),
      GlobalMiddleWares.checkError,
      AddressController.getLimitedAddress,
    );
  }
  POST() {
    this.router.post(
      "/create-address",
      GlobalMiddleWares.auth,
      AddressValidator.createAddress(),
      GlobalMiddleWares.checkError,
      AddressController.createAddress,
    );
  }

  PUT() {
    this.router.put(
      "/edit-address/:id",
      GlobalMiddleWares.auth,
      AddressValidator.editAddress(),
      GlobalMiddleWares.checkError,
      AddressController.editAddress,
    );
  }

  PATCH() {}

  DELETE() {
    this.router.delete(
      "/delete-address/:id",
      GlobalMiddleWares.auth,
      AddressController.deleteAddress,
    );
  }
}
export default new AddressRoutes().router;
