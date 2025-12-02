import { Router } from "express";
import { getConversationMessagesbyId, postMessage } from "../controllers/message.controller.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { checkConversationAuthor } from "../middlewares/check-authorization.middleware.ts";
import { idParamsSchema } from "../validation/utils.validation.ts";

export const messageRouter = Router();

messageRouter
  .route("/:id/messages")
  .all(
    validate("params", idParamsSchema), 
    checkConversationAuthor, 
  )
  .get(getConversationMessagesbyId)
  .post(postMessage);



  