import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidator {
  static signup() {
    return [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters long")
        .isAlphanumeric()
        .withMessage("Password must be alphanumeric"),
      body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Provide a valid phone number"),
      body("type")
        .notEmpty()
        .withMessage("User type role is required")
        .isString()
        .withMessage("User type role must be a string"),
      body("status")
        .notEmpty()
        .withMessage("User status is required")
        .isString()
        .withMessage("User status must be a string"),
    ];
  }
  static verifyUserEmail() {
    return [
      body("verification_token")
        .notEmpty()
        .withMessage("Verification token is required")
        .isNumeric()
        .withMessage("Verification token must be numeric"),
    ];
  }
  static resendVerificationEmail() {
    return [
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid email")
        .normalizeEmail(),
    ];
  }
  static login() {
    return [
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid Email")
        .custom(async (email, { req }) => {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Email is not registered");
          }
          req.user = user;
          return true;
        }),
      query("password")
        .notEmpty()
        .withMessage("Password is required")
        .isAlphanumeric()
        .withMessage("Password must be alphanumeric"),
    ];
  }

  static checkPasswordResetEmail() {
    return [
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid Email")
        .normalizeEmail()
        .custom(async (email, { req }) => {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Email is not registered");
          }
          // req.user = user;
          return true;
        }),
    ];
  }

  static verifyPasswordResetToken() {
    return [
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid Email")
        .normalizeEmail(),
      query("reset_password_token")
        .notEmpty()
        .withMessage("Reset password token is required")
        .custom(async (reset_password_token, { req }) => {
          const user = await User.findOne({
            email: (req as any).query.email,
            reset_password_token: reset_password_token,
            reset_password_token_time: { $gt: Date.now() },
          });
          if (!user) {
            throw new Error(
              "Reset token is invalid or has expired. Please request a new one.",
            );
          }
          // req.user = user;
          return true;
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid Email")
        .normalizeEmail()
        .custom(async (email, { req }) => {
          const user = await User.findOne({ email: email });
          if (!user) throw new Error("Email is not registered");
          req.user = user;
          return true;
        }),
      body("otp")
        .notEmpty()
        .withMessage("Reset token is required")
        .custom(async (reset_password_token, { req }) => {
          if (reset_password_token !== req.user.reset_password_token) {
            throw new Error(
              "Reset token is invalid or has expired. Please request a new one.",
            );
          }
          return true;
        }),
      body("new_password")
        .notEmpty()
        .withMessage("New password is required")
        .isAlphanumeric()
        .withMessage("New password must be alphanumeric")
        .isLength({ min: 4 })
        .withMessage("New password must be at least 4 characters long"),
    ];
  }

  static verifyPhoneNumber() {
    return [
      body("phone")
        .notEmpty()
        .withMessage("Phone Number is required")
        .isString()
        .withMessage("Provide a valid phone number"),
    ];
  }
  static verifyUserProfile() {
    return [
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Provide a valid email")
        .normalizeEmail()
        .custom(async (email, { req }) => {
          const user = await User.findOne({ email: email });
          if (user)
            throw new Error("Please provide a new unique email address");
          // req.user = user;
          return true;
        }),
      body("phone")
        .notEmpty()
        .withMessage("Phone Number is required")
        .isString()
        .withMessage("Provide a valid phone number"),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isAlphanumeric()
        .withMessage("Password must be alphanumeric"),
    ];
  }
}
