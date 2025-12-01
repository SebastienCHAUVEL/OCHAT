import type { Request, Response } from "express";
import { idNumSchema } from "../validation/utils.validation.ts";
import { Conversation } from "../models/conversation.model.ts";

export async function getUserConversations(req: Request, res: Response) {
  // Parsing id into numeric id

  const userId = idNumSchema.parse(req.headers['x-user-id']);
  // Find all conversations of the current user
  const conversations = await Conversation.findAllByUserId(userId);

  res.json(conversations);
}

export async function postConversation(req: Request, res: Response) {
  const userId = idNumSchema.parse(req.headers['x-user-id'])

  const createdConversation = await Conversation.create({ userId: userId, title: req.body.title });
  console.log(createdConversation);

  res.status(201).json(createdConversation);

}

export async function patchConversationById(req: Request, res: Response) {
  res.json("Modification résussit")
}

export async function deleteConversationById(req: Request, res: Response) {
  
}