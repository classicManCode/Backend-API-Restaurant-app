import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { Utils } from "../utils/Utils";
import { SendGridMailer } from "../utils/SendGridMailer";
import Jwt from "jsonwebtoken";
import { EncryptPassword } from "../utils/EncryptPassword";
import { ComparePassword } from "../utils/ComparePassword";

class UserControllers {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const hash = await EncryptPassword.hashPassword(req.body.password);
    const email = req.body.email;
    const password = hash;
    const name = req.body.name;
    const type = req.body.type;
    const status = req.body.status;
    const phone = req.body.phone;
    const verification_token = Utils.generateVerificationToken();

    try {
      const data = {
        email,
        verification_token: verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        password,
        name,
        type,
        status,
        phone,
      };
      const user = await new User(data).save();
      const payload = {
        aud: user._id,
        email: user.email,
        type: user.type,
      };
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
      }
      const token = Jwt.sign(payload, jwtSecret, {
        expiresIn: "180d",
      });
      await SendGridMailer.sendMail({
        to: [user.email],
        subject: `Veify your email`,
        html: `Your OTP is ${verification_token}`,
      });
      res.status(201).json({
        token: token,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async verifyEmailToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const email = (req as any).user.email;
    const verification_token = req.body.verification_token;
    try {
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_verified: true,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      );
      if (user) {
        res.status(200).send(user);
      } else {
        throw new Error(
          "Email verification token expired. Please try agian...",
        );
      }
    } catch (err) {
      next(err);
    }
  }

  static async resendVerificationEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // res.send((req as any).user)
    const email = (req as any).user.email;
    const verification_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        },
      );
      if (user) {
        await SendGridMailer.sendMail({
          to: [user.email],
          subject: `Veify your email`,
          html: `Your OTP is ${verification_token}`,
        });
        res.json({
          success: true,
          message: "Verification token sent successfully",
        });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      next(err);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    // const email = req.query.email;
    const password = req.query.password as string;
    const data = {
      password: password,
      encryptedPassword: user.password,
    };
    try {
      await ComparePassword.comparePassword(data);
      const payload = {
        aud: user._id,
        email: user.email,
        type: user.type,
      };
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
      }
      const token = Jwt.sign(payload, jwtSecret, {
        expiresIn: "180d",
      });
      res.status(200).json({
        token: token,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async sendPasswordResetToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const email = req.query.email;
    const reset_password_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          reset_password_token: reset_password_token,
          reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
          updatedAt: new Date(),
        },
      );

      if (!user) throw new Error("This Email is not registered. Try again...");
      await SendGridMailer.sendMail({
        to: [user.email],
        subject: "Reset your password",
        html: `Your OTP is ${reset_password_token}`,
      });
      res.json({
        success: true,
        message: "Password reset token sent successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static verifyResetPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.json({
      success: true,
      message: "Password reset token has been verified successfully",
    });
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const new_password = req.body.new_password;
    try {
      const encryptedPassword =
        await EncryptPassword.hashPassword(new_password);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { password: encryptedPassword, updatedAt: new Date() },
        { new: true },
      );
      if (!updatedUser) {
        throw new Error("Email is not registered");
      }
      res.status(200).send(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    const profile = await User.findByIdAndUpdate(user.aud);
    if (!profile) {
      throw new Error("User not found");
    }
    res.status(200).send(profile);
  }

  static async updatePhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = (req as any).user;
    const phone = req.body.phone;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        { phone: phone, updatedAt: new Date() },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async updateUserProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = (req as any).user;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const verification_token = Utils.generateVerificationToken();

    try {
      const userData = await User.findById(user.aud);
      if (!userData) {
        throw new Error("User not found");
      }

      await ComparePassword.comparePassword({
        password: password,
        encryptedPassword: userData.password,
      });
      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        {
          email: email,
          phone: phone,
          email_verified: false,
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
          updatedAt: new Date(),
        },
        { new: true },
      );
      if (!updatedUser) {
        throw new Error("Failed to update user profile");
      }
      const payload = {
        aud: updatedUser._id,
        email: updatedUser.email,
        type: updatedUser.type,
      };
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
      }
      const token = Jwt.sign(payload, jwtSecret, {
        expiresIn: "180d",
      });
      res.status(200).json({
        token: token,
        user: updatedUser,
      });
      await SendGridMailer.sendMail({
        to: [updatedUser.email],
        subject: "Verify your email",
        html: `Your OTP is ${verification_token}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserControllers;
