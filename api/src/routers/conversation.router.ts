import { Router } from "express";
import { deleteConversationById, getUserConversations, patchConversationById, postConversation } from "../controllers/conversation.controller.ts";
import { messageRouter } from "./message.router.ts";
import { checkConversationAuthor } from "../middlewares/check-authorization.middleware.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { idParamsSchema } from "../validation/utils.validation.ts";

export const conversationRouter = Router();

conversationRouter
  .route("/")
  .get(getUserConversations)
  .post(postConversation)
  
conversationRouter
  .route("/:id")
  .all(
    validate("params", idParamsSchema), 
    checkConversationAuthor
  )
  .patch(patchConversationById)
  .delete(deleteConversationById)

conversationRouter.use(
  "/:id/messages", 
  validate("params", idParamsSchema), 
  checkConversationAuthor, 
  messageRouter
);