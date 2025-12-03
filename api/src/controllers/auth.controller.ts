import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { ConflictError, UnauthorizedError } from "../utils/errors.ts";

export async function register(req: Request, res: Response, next: NextFunction) {
  // Checking if username is already taken
  const existingUser = await User.findByName(req.body.username)
  if(existingUser) {
    next(new ConflictError("Username already exist"));
    return;
  }

  // Create new user in database
  const newUser = await User.createAccount(req.body);

  // Generate access token
  const accessToken = newUser.generateAccessToken(); 

  // Set access token in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 4 * 60 * 60 * 1000, // 4h
    httpOnly: true,              // -> front does not have access
    // secure: true,                // HTTPS only (prod)
    sameSite: 'strict',          // CSRF Protection 
  });

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
  const accessToken = user.generateAccessToken(); 

  // Set access token in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 4 * 60 * 60 * 1000, // 4h
    httpOnly: true,              // -> front does not have access to cookies
    secure: process.env.NODE_ENV === 'production', // true en prod
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  
  res.json(user.hidePassword());
}

export async function logout(_: any, res: Response) {
  // Set access token in cookies
  res.cookie("accessToken", "", {
    maxAge: 10 * 1000, // 10s
    httpOnly: true,              // -> front does not have access to cookies
    secure: process.env.NODE_ENV === 'production', // true en prod
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  
  res.status(204).end();
}