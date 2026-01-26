import { NextFunction, Request, Response } from "express";
import Address from "../models/Address";
import { IAddress } from "../models/Address";

export class AddressController {
  static async createAddress(req: Request, res: Response, next: NextFunction) {
    const user_id = (req as any).user.aud;
    const { title, address, houseNumber, landmark, lat, lng } = req.body;
    try {
      const addressDoc: IAddress = {
        user_id,
        title,
        address,
        houseNumber,
        landmark,
        lat,
        lng,
      };
      const savedAddress = await new Address(addressDoc).save();
      res.status(201).json({
        message: "Address created successfully",
        savedAddress,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAddress(req: Request, res: Response, next: NextFunction) {
    const user_id = (req as any).user.aud;
    try {
      const address = await Address.find({ user_id }, { user_id: 0, __v: 0 });
      res.status(200).json({
        message: "Address fetched successfully",
        address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAddress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user_id = (req as any).user.aud;
    try {
      const address = await Address.findByIdAndDelete({ user_id, _id: id });
      if (!address) {
        throw new Error("Address does not exist");
      }
      res
        .status(200)
        .json({ success: true, message: "Address deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async getAddressById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user_id = (req as any).user.aud;
    try {
      const address = await Address.findById({ _id: id }, { __v: 0 });
      if (!address) {
        throw new Error("Address does not exist");
      }
      res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editAddress(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user_id = (req as any).user.aud;
    const addressData = req.body;
    try {
      const address = await Address.findOneAndUpdate(
        { user_id, _id: id },
        {
          title: addressData.title,
          address: addressData.address,
          houseNumber: addressData.houseNumber,
          landmark: addressData.landmark,
          lat: addressData.lat,
          lng: addressData.lng,
        },
        {
          new: true,
          projection: { user_id: 0, __v: 0 },
        },
      );
      if (!address) {
        throw new Error("Address does not exist");
      }
      res.status(200).json({
        success: true,
        message: "Address updated successfully",
        address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async checkAddress(req: Request, res: Response, next: NextFunction) {
    const user_id = (req as any).user.aud;
    const addressData = req.query;
    try {
      const address = await Address.find(
        { user_id, lat: Number(addressData.lat), lng: Number(addressData.lng) },
        { user_id: 0, __v: 0 },
      );
      res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        address,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getLimitedAddress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user_id = (req as any).user.aud;
    const { limit } = req.query;
    try {
      const address = await Address.find(
        { user_id },
        { user_id: 0, __v: 0 },
      ).limit(Number(limit));
      res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        address,
      });
    } catch (err) {
      next(err);
    }
  }
}
