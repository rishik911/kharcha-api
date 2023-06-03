import express from "express";
import { validateRequestBody } from "../Middlewares/JoiVerification.js";
import { ProfileUpdateSchema, SignUpSchema } from "../Schemas/AuthSchema.js";
import {
  createUserController,
  getUserProfileController,
  loginUserController,
  updateProfileController,
} from "../Controller/AuthController.js";
import { verifyAuthToken } from "../Middlewares/AuthVerification.js";

console.log("in the route");

const Router = express.Router();

Router.post("/signup", validateRequestBody(SignUpSchema), createUserController);

Router.post("/login", validateRequestBody(SignUpSchema), loginUserController);

Router.get("/profile", verifyAuthToken, getUserProfileController);

Router.put(
  "/profile",
  verifyAuthToken,
  validateRequestBody(ProfileUpdateSchema),
  updateProfileController
);

export default Router;
