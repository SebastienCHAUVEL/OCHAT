import { Router } from "express";
import { getMessagesByConversationId, postMessage } from "../controllers/message.controller.ts";

export const messageRouter = Router();

messageRouter.get("/", getMessagesByConversationId);
messageRouter.post("/", postMessage);