import express from "express";
import { validateRequestBody } from "../Middlewares/JoiVerification.js";
import { SignUpSchema } from "../Schemas/AuthSchema.js";
import {
  createUserController,
  getUserProfileController,
  loginUserController,
} from "../Controller/AuthController.js";
import { verifyAuthToken } from "../Middlewares/AuthVerification.js";

const Router = express.Router();

Router.post("/signup", validateRequestBody(SignUpSchema), createUserController);

Router.post("/login", validateRequestBody(SignUpSchema), loginUserController);

Router.get("/profile", verifyAuthToken, getUserProfileController);

export default Router;
