import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { UnauthorizedError } from "../utils/errors.ts";

export async function checkLogin(req: Request, res: Response, next: NextFunction) {
  // extract authorizaion header
  const authorizationHeader = req.header('authorization');
  if(!authorizationHeader) {
    next(new UnauthorizedError("You must be logged in to access this section"))
    return;
  }
  
  // Extract access token
  const accessToken = authorizationHeader.split(' ')[1];

  // Verify access token and get the user
  const user = await User.verifyAccessToken(accessToken);
  if(!user) {
    next(new UnauthorizedError("You must be logged in to access this section"))
    return;
  }

  // Save user for next middlewares
  req.headers['x-user-id'] = `${user.id}`;

  next();
}

export function checkConversationAuthor(req: Request, res: Response, next: NextFunction) {

}