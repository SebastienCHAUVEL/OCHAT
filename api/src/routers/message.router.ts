import { Router } from "express";
import { getMessagesByConversationId, postMessage } from "../controllers/message.controller.ts";

export const messageRouter = Router();

messageRouter.get("/:conversationId", getMessagesByConversationId);
messageRouter.post("/", postMessage);