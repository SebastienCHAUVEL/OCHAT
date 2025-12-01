import type { NextFunction, Request, Response } from "express";
import { idNumSchema } from "../validation/utils.validation.ts";
import { Conversation } from "../models/conversation.model.ts";
import { NotFoundError } from "../utils/errors.ts";

export async function getUserConversations(req: Request, res: Response) {
  // Parsing id into numeric id
  const userId = idNumSchema.parse(req.headers['x-user-id']);

  // Find all conversations of the current user
  const conversations = await Conversation.findAllByUserId(userId);

  res.json(conversations);
}

export async function postConversation(req: Request, res: Response) {
  // Parsing id into numeric id
  const userId = idNumSchema.parse(req.headers['x-user-id'])

  // Create a new conversation in database 
  const createdConversation = await Conversation.create({ userId: userId, title: req.body.title });

  res.status(201).json(createdConversation);

}

export async function patchConversationById(req: Request, res: Response, next: NextFunction) {
  // Parsing id into numeric id
  const id = idNumSchema.parse(req.params.id);

  // Update conversation in database
  const updatedConversation = await Conversation.updateTitleById(id, req.body.title);

  // Check if we found the conversation
  if(!updatedConversation) {
    next(new NotFoundError("Conversation not found"));
    return;
  }

  res.json(updatedConversation)
}

export async function deleteConversationById(req: Request, res: Response, next: NextFunction) {
  // Parsing id into numeric id
  const id = idNumSchema.parse(req.params.id);

  // Removing the conversation in database
  await Conversation.removeById(id);

  res.status(204).end();
}