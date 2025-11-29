import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "../validation/auh.validation.ts";
import { User } from "../models/user.model.ts";
import { ConflictError, UnauthorizedError } from "../utils/errors.ts";

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

export async function login(req: Request, res: Response, next: NextFunction) {
  // Checking if user exist
  const user = await User.findByName(req.body.username)
  if(!user) {
    next(new UnauthorizedError("Invalid credentials"));
    return;
  }

  // Check if password match
  const isPasswordValid = await user.verifyPassword(req.body.password);
  if(!isPasswordValid) {
    next(new UnauthorizedError("Invalid credentials"));
    return;
  }

  // Generate access token
  const token = user.generateAccessToken(); 
  
  res.json({
    ...user.hidePassword(), 
    token 
  });
}