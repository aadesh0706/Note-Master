import express from "express";
import {
  registerUser,
  loginUser,
  checkUser,
} from "../Controller/userController.js";
export const userRouter = express.Router();

userRouter.post("/api/register", registerUser);
userRouter.post("/api/login", loginUser);
userRouter.get("/api/authenticateUser", checkUser);
