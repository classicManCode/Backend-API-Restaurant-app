import Jwt from "jsonwebtoken";

export class JWT {
  static JWTverify(token: string): Promise<any> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    return new Promise((resolve, reject) => {
      Jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          reject(err);
        } else if (!decoded) {
          reject("Invalid token");
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
