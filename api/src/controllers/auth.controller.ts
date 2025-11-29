import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "../validation/auh.validation.ts";
import { User } from "../models/user.model.ts";
import { ConflictError } from "../utils/errors.ts";

export async function register(req: Request, res: Response, next: NextFunction) {

  // Checking if username is already taken
  const existingUser = await User.findByName(req.body.username)
  if(existingUser) {
    next(new ConflictError("Username already exist"));
    return;
  }

  const newUser = await User.createAccount(req.body);

  res.status(201).json(newUser.hidePassword());

}

export async function login(req: Request, res: Response) {

}