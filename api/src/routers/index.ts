import { Router } from "express";
import { authRouter } from "./auth.router.ts";
import { conversationRouter } from "./conversation.router.ts";
import { promptRouter } from "./prompt.router.ts";
import { checkLogin } from "../middlewares/check-authorization.middleware.ts";

export const router = Router();

router.use("/auth", authRouter);
router.use("/conversations", conversationRouter);
router.use("/prompt", checkLogin, promptRouter);