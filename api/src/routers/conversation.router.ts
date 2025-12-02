import { Router } from "express";
import { deleteConversationById, getUserConversations, patchConversationById, postConversation } from "../controllers/conversation.controller.ts";
import { messageRouter } from "./message.router.ts";
import { checkConversationAuthor } from "../middlewares/check-authorization.middleware.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { idParamsSchema } from "../validation/utils.validation.ts";
import { createConversationSchema, updateConversationSchema } from "../validation/conversation.validation.ts";

export const conversationRouter = Router();

conversationRouter
  .route("/")
  .get(getUserConversations)
  .post(validate("body", createConversationSchema), postConversation)
  
conversationRouter
  .route("/:id")
  .all(
    validate("params", idParamsSchema), 
    checkConversationAuthor
  )
  .patch(validate("body", updateConversationSchema), patchConversationById)
  .delete(deleteConversationById)

conversationRouter.use(messageRouter);