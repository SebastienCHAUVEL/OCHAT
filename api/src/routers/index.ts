import { Router } from "express";
import { authRouter } from "./auth.router.ts";
import { conversationRouter } from "./conversation.router.ts";
import { messageRouter } from "./message.router.ts";
import { promptRouter } from "./prompt.router.ts";

export const router = Router();

router.use("/auth", authRouter);
router.use("/conversations", conversationRouter);
router.use("/messages", messageRouter);
router.use("/prompt", promptRouter);