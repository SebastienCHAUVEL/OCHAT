import type { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model.ts";
import { idNumSchema } from "../validation/utils.validation.ts";
import { NotFoundError } from "../utils/errors.ts";

export async function getConversationMessagesbyId(req: Request, res: Response, next: NextFunction) {
  // Parsing conversation id into numeric id
  const conversationId = idNumSchema.parse(req.params.id);
  
  // Find the messages for the current conversation
  const messages = await Message.findAllByConversationId(conversationId);
  
  // Check if we found messages for the current conversation
  if(!messages) {
    next(new NotFoundError("No messages found for this conversation"));
    return;
  }

  res.json(messages);
}

export async function postMessage(req: Request, res: Response) {
  const createdMessage = await Message.create(req.body);

  res.status(201).json(createdMessage);
}
