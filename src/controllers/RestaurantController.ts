import { NextFunction, Request, Response } from "express";
import Restaurant from "../schemas/Restaurant";
import { EncryptPassword } from "../utils/EncryptPassword";
import { Utils } from "../utils/Utils";
import User from "../schemas/User";
import Category from "../schemas/Category";

export class RestaurantController {
  static async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const restaurant = req.body;
    const path = (req as any).file.path;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const type = "restaurant";
    const status = "active";
    const phone = req.body.phone;
    const verification_token = Utils.generateVerificationToken();

    try {
      const hash = await EncryptPassword.hashPassword(password);
      const data = {
        email,
        verification_token: verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        password: hash,
        name,
        type,
        status,
        phone,
      };
      const user = await new User(data).save();

      const categoriesData = JSON.parse(restaurant.categories).map(
        (category: any) => {
          return {
            name: category,
            user_id: user._id,
          };
        },
      );

      const categories = await Category.insertMany(categoriesData);

      let restaurantData = {
        name: restaurant.res_name,
        short_name: restaurant.short_name,
        description: restaurant.description,
        coverImage: path,
        address: restaurant.address,
        location: JSON.parse(restaurant.location),
        cuisines: JSON.parse(restaurant.cuisines),
        price: restaurant.price,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        deliveryTime: restaurant.deliveryTime,
        rating: restaurant.rating,
        totalRating: restaurant.totalRating,
        isClosed: restaurant.isClosed,
        status: restaurant.status,
        user_id: user._id,
        city_id: restaurant.city_id,
      };

      if (restaurant.description) {
        restaurantData = {
          ...restaurantData,
          description: restaurant.description,
        };
      }

      const restaurantDoc = await new Restaurant(restaurantData).save();

      res.status(201).json({
        message: "Restaurant created successfully",
        restaurantDoc,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getNearbyRestaurants(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = (req as any).query;
      const EARTH_RADIUS_IN_KM = 6378.1;
      const restaurant = await Restaurant.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / EARTH_RADIUS_IN_KM,
            ],
          },
        },
        status: "active",
      });
      if (restaurant.length === 0) {
        (req as any).errorStatus = 404;
        throw new Error("No restaurant found");
      }
      res.status(200).json({
        message: "Cities fetched successfully",
        restaurant,
      });
    } catch (err) {
      next(err);
    }
  }
  static async searchNearbyRestaurants(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = (req as any).query;
      const EARTH_RADIUS_IN_KM = 6378.1;
      const restaurant = await Restaurant.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / EARTH_RADIUS_IN_KM,
            ],
          },
        },
        name: { $regex: data.name, $options: "i" },
        status: "active",
      });
      if (restaurant.length === 0) {
        (req as any).errorStatus = 404;
        throw new Error("No restaurant found");
      }
      res.status(200).json({
        message: "Cities fetched successfully",
        restaurant,
      });
    } catch (err) {
      next(err);
    }
  }
}
