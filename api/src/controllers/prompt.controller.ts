import type { NextFunction, Request, Response } from "express";
import { fetchMistral } from "../services/prompt.service.ts";
import { BadGatewayError } from "../utils/errors.ts";

export async function askMistral(req: Request, res: Response, next: NextFunction) {
  const response = await fetchMistral(req.body.messages, "mistral-small-latest");

  if(!response.ok) {
    next(new BadGatewayError(`Mistral API Error: ${JSON.parse(response.message).detail}`));
    return;
  }
  
  res.json({ content: response.message });
}