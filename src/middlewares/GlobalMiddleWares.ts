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
    const token = headers_auth
      ? headers_auth.slice(7, headers_auth.length)
      : null;
    // const auth_headers = headers_auth?.split(" ")[1];
    // const token = auth_headers

    if (!token) {
      (req as any).errorStatus = 401;
      next(new Error("User not authenticated"));
      return;
    }

    try {
      const decoded = await JWT.JWTverify(token);
      (req as any).user = decoded;
      console.log((req as any).user.aud);
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
      console.log(user.type);
      return next(new Error("You are not authorized to perform this action"));
    }
    next();
  }
}

//  static async auth(req: Request, res: Response, next: NextFunction) {
//   const headers_auth = req.headers.authorization;
//   const token =
//     headers_auth && headers_auth.startsWith("Bearer ")
//       ? headers_auth.slice(7, headers_auth.length)
//       : headers_auth;

//   if (!token) {
//     next(new Error("User not authenticated"));
//     return;
//   }

//   try {
//     const decoded = await JWT.JWTverify(token);
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }
