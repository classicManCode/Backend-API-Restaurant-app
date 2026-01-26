import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Jwt from "jsonwebtoken";
import { JWT } from "../utils/JWT";

export class GlobalMiddleWares {
  static checkError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Error(errors.array()[0].msg));
    }
    next();
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    const headers_auth = req.headers.authorization;
    const token =
      headers_auth && headers_auth.startsWith("Bearer ")
        ? headers_auth.split(" ")[1]
        : null;

    if (!token) {
      (req as any).errorStatus = 401;
      next(new Error("User not authenticated"));
      return;
    }

    try {
      const decoded = await JWT.jwtVerify(token);
      (req as any).user = decoded;
      next();
    } catch (err) {
      (req as any).errorStatus = 401;
      next(err);
    }
  }

  static async adminRole(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (user.type !== "admin") {
      (req as any).errorStatus = 401;
      return next(new Error("You are not authorized to perform this action"));
    }
    next();
  }
}
