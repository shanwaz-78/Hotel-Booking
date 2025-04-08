import { Router } from "express";
import controllers from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/login", controllers.userController.loginController);

export default userRoute;
