import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export class ComparePassword {
  static async comparePassword(
   data:{ password: string,
    encryptedPassword: string}
  ): Promise<any> {
    const isMatch = await bcrypt.compare(data.password, data.encryptedPassword);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
    return true;
  }
}
