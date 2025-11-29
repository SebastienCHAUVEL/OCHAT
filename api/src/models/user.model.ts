import argon2 from "argon2"
import { UserDatamapper } from "../datamappers/user.datamapper.ts";
import type { RegisterInput } from "../validation/auh.validation.ts";

export interface UserRecord {
  id: number,
  username: string,
  password: string
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

  static async createAccount(newUser: RegisterInput) {
    // Hash password with argon2 
    const hashedPassword = await argon2.hash(newUser.password);
    // Save user in database with hashed password
    const createdUser = await UserDatamapper.create({ ...newUser, password: hashedPassword });

    return new User(createdUser);
  }

  // hide the password in an instance of user
  hidePassword() {
    const { password, ...user } = this;
    return user;
  }
}