import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";
import dotenv from "dotenv";
import BannerRoutes from "./routes/BannerRoutes";
import CityRoutes from "./routes/CityRoutes";
import RestaurantRoutes from "./routes/RestaurantRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import ItemRoutes from "./routes/ItemRoutes";
import AddressRoutes from "./routes/AddressRoutes";
import OrderRoutes from "./routes/OrderRoutes";

dotenv.config({ quiet: true });

class Server {
  app: Express = express();
  constructor() {
    this.setConnectDB();
    this.setMiddlewares();
    this.setRoutes();
    //error handlers should always be last
    this.error404Handler();
    this.handleErrors();
  }

  setMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));
    this.app.use("/api/users", UserRoutes);
    this.app.use("/api/banner", BannerRoutes);
    this.app.use("/api/city", CityRoutes);
    this.app.use("/api/restaurant", RestaurantRoutes);
    this.app.use("/api/category", CategoryRoutes);
    this.app.use("/api/item", ItemRoutes);
    this.app.use("/api/address", AddressRoutes);
    this.app.use("/api/order", OrderRoutes);
  }

  setConnectDB() {
    const connectDb = async () => {
      try {
        const mongodbURI = process.env.MONGODB_URI;
        if (!mongodbURI) {
          throw new Error("MONGODB_URI is not defined");
        }
        await mongoose.connect(mongodbURI);
        console.log("CONNECTED TO MongoDB");
      } catch (err) {
        console.log(`CONNECTION ERROR : ${err}`);
      }
    };
    connectDb();
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: "Page Not Found", status_code: 404 });
    });
  }

  handleErrors() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const errorStatus = (req as any).errorStatus || 500;
        res.status(errorStatus).json({
          message: err.message || "Something went wrong. Please try again",
          status_code: errorStatus,
        });
      },
    );
  }
}

export default new Server().app;
