import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../utils/errors.ts";
import { idNumSchema } from "../validation/utils.validation.ts";
import { Conversation } from "../models/conversation.model.ts";
import { ConversationDatamapper } from "../datamappers/conversation.datamapper.ts";

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

export async function checkConversationAuthor(req: Request, res: Response, next: NextFunction) {
  // Parse id's into numerics id
  const userId = idNumSchema.parse(req.headers['x-user-id']);
  const conversationId = idNumSchema.parse(req.params.id);

  // Making sure the conversation exist in database
  const conversation = await Conversation.findById(conversationId);
  if(!conversation) {
    next(new NotFoundError(`Conversation not found`));
    return;
  }

  // Get the current user with his conversations
  const currentUser = await User.findByIdWithConversations(userId);
  
  // If no currentUser found, it means no conversation is found for the current user, so he cannot own the conversation
  if(!currentUser) {
    next(new ForbiddenError(`You must own the conversation to access this section`))
    return;
  }

  // Check if the current user's conversations contain the conversation.
  const isAuthor = 
    currentUser.conversations
      .map((conversation) => conversation.id === conversationId)
      .includes(true);
  
  if(!isAuthor){
    next(new ForbiddenError(`You must own the conversation to access this section`))
    return;
  }

  next();
}