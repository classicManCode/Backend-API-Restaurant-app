import { Router } from "express";
import UserController from "../controllers/UserController";
import { UserValidator } from "../validators/UserValidator";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";

class UsersRoutes {
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
      "/signup",
      GlobalMiddleWares.checkError,
      UserController.signup
    );
    this.router.get(
      "/send/verification/email",
      GlobalMiddleWares.auth,
      UserController.resendVerificationEmail
    );
    this.router.get(
      "/send/reset/password",
      UserValidator.checkPasswordResetEmail(),
      GlobalMiddleWares.checkError,
      UserController.sendPasswordResetToken
    );
    this.router.get(
      "/login",
      UserValidator.login(),
      GlobalMiddleWares.checkError,
      UserController.login
    );
    this.router.get(
      "/verify/resetPasswordToken",
      UserValidator.verifyPasswordResetToken(),
      GlobalMiddleWares.checkError,
      UserController.verifyResetPasswordToken
    );
    this.router.get(
      "/profile",
      GlobalMiddleWares.auth,
      GlobalMiddleWares.checkError,
      UserController.profile
    );
  }
  POST() {
    this.router.post(
      "/signup",
      UserValidator.signup(),
      GlobalMiddleWares.checkError,
      UserController.signup
    );
  }
  PUT() {}
  PATCH() {
    this.router.patch(
      "/verify_email_token",
      UserValidator.verifyUserEmail(),
      GlobalMiddleWares.auth,
      GlobalMiddleWares.checkError,
      UserController.verifyEmailToken
    );

    this.router.patch(
      "/reset_password",
      UserValidator.resetPassword(),
      GlobalMiddleWares.checkError,
      UserController.resetPassword
    );

    this.router.patch(
      "/update/phone",
      GlobalMiddleWares.auth,
      UserValidator.verifyPhoneNumber(),
      GlobalMiddleWares.checkError,
      UserController.updatePhoneNumber
    );

    this.router.patch(
      "/update/profile",
      GlobalMiddleWares.auth,
      UserValidator.verifyUserProfile(),
      GlobalMiddleWares.checkError,
      UserController.updateUserProfile
    );
  }
  DELETE() {}
}
export default new UsersRoutes().router;
