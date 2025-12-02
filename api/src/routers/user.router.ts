import { Router } from "express";
import { getMe } from "../controllers/user.controller.ts";

export const userRouter = Router();

userRouter.get('/me', getMe);