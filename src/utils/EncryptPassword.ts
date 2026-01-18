import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export class EncryptPassword {
  static async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash
  }
}
