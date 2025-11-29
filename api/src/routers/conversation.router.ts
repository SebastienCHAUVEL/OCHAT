import { Router } from "express";
import { deleteConversationById, getUserConversations, patchConversationById, postConversation } from "../controllers/conversation.controller.ts";
import { messageRouter } from "./message.router.ts";

export const conversationRouter = Router();

conversationRouter.get("/", getUserConversations);
conversationRouter.post("/", postConversation);
conversationRouter.patch("/:id", patchConversationById);
conversationRouter.delete("/:id", deleteConversationById);

conversationRouter.use("/:id/messages", messageRouter);