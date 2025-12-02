import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { NotFoundError } from "../utils/errors.ts";
import { idNumSchema } from "../validation/utils.validation.ts";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  const userId = idNumSchema.parse(req.headers['x-user-id']);
  // Checking if user exist
  const user = await User.findById(userId);

  if(!user) {
    next(new NotFoundError("User not Found"));
    return;
  }
  
  res.json(user.hidePassword());
}