import { Router } from "express";
import controller from "../controllers/index.js";

const hotelRouter = Router();

hotelRouter.post(
  "/book-hotel",
  controller.bookHotelController.bookHotelController
);
hotelRouter.get(
  "/get-hotels",
  controller.bookHotelController.getAllHotelsController
);

export default { hotelRouter };
