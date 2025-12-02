import { Router } from "express";
import { authRouter } from "./auth.router.ts";
import { conversationRouter } from "./conversation.router.ts";
import { promptRouter } from "./prompt.router.ts";
import { checkLogin } from "../middlewares/check-authorization.middleware.ts";
import { userRouter } from "./user.router.ts";

export const router = Router();

router.use("/auth", authRouter);
router.use('/users', checkLogin, userRouter)
router.use("/conversations", checkLogin, conversationRouter);
router.use("/prompt", promptRouter);