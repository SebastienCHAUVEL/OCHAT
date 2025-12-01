import type { Request, Response } from "express";

export async function getUserConversations(req: Request, res: Response) {
  res.json("Toutes mes conversations")
}

export async function postConversation(req: Request, res: Response) {
  
}

export async function patchConversationById(req: Request, res: Response) {
  res.json("Modification résussit")
}

export async function deleteConversationById(req: Request, res: Response) {
  
}