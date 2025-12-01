import argon2 from "argon2"
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UserDatamapper, type UserRecord } from "../datamappers/user.datamapper.ts";
import type { RegisterInput } from "../validation/auh.validation.ts";
import { idNumSchema, type idNum } from "../validation/utils.validation.ts";
import { Conversation } from "./conversation.model.js";
import type { ConversationRecord } from "../datamappers/conversation.datamapper.ts";

interface accessTokenPayload extends JwtPayload {
  sub: string
}

export class User {
  id: number;
  username: string;
  password: string;

  constructor(user: UserRecord) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
  }

  // Find user in database with his username and return an instance of user
  static async findByName(username: string){
    const user = await UserDatamapper.findByName(username);
    if(!user) {
      return null;
    }
    
    return new User(user);
  }

  // Find user by id
  static async findById(id: idNum) {
    const user = await UserDatamapper.findByid(id);
    if(!user) {
      return null;
    }

    return new User(user);
  }

  // Find user by id with user conversations
  static async findByIdWithConversations(id: idNum) {
    const data = await UserDatamapper.findByidWithConversations(id);
    if(!data) {
      return null;
    }

    // Each element of data contain the same userRecord, we only need one
    const userRecord = data[0];
    // Extract conversations from data
    const conversationRecords = data.map((element) => {
      return {
        id: element.conversation_id, 
        title: element.title,
        userId: element.id 
      }
    });

    // Build an instance of UserWithConversations
    return new UserWithConversations(userRecord, conversationRecords);
  }

  // Hash password and save user in database and return an instance of user
  static async createAccount(newUser: RegisterInput) {
    // Hash password with argon2 
    const hashedPassword = await argon2.hash(newUser.password);
    // Save user in database with hashed password
    const createdUser = await UserDatamapper.create({ ...newUser, password: hashedPassword });

    return new User(createdUser);
  }

  // Check access token and return an instance of user
  static async verifyAccessToken(accessToken: string) {
    // If no JWT_SECRET in environment variables --> Error 500
    if(!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Verify jwt and get an access token payload: { sub: userId, iat: issued at, exp: expire at }
    const data = jwt.verify(accessToken, process.env.JWT_SECRET) as accessTokenPayload;

    // Parsing sub into numeric id 
    const userId = idNumSchema.parse(data.sub)
    
    // Get the user by id
    return await User.findById(userId)
  }

  // hide the password in an instance of user
  hidePassword() {
    const { password, ...user } = this;
    return user;
  }

  // Check if a password match with the current user password
  verifyPassword(passwordToCheck: string) {
    return argon2.verify(this.password, passwordToCheck);
  }

  // Generate an access token
  generateAccessToken() {
    // If no JWT_SECRET in environment variables --> Error 500
    if(!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    // Return the jwt (sub: subject)
    return jwt.sign({ sub: this.id}, process.env.JWT_SECRET, { expiresIn: '4h' });
  }
}

export class UserWithConversations extends User {
  conversations: Array<Conversation> ;
  constructor(user: UserRecord, conversations: Array<ConversationRecord>) {
    super(user);
    // Adding array of instance of conversation
    this.conversations = conversations.map((conversation) => new Conversation(conversation));
  }
}