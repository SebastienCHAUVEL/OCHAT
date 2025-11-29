import client from "../config/database.client.ts";
import type { UserRecord } from "../models/user.model.ts";
import type { RegisterInput } from "../validation/auh.validation.ts";

export class UserDatamapper {
  static async findByName(username: string): Promise<UserRecord | null> {
    const preparedQuery = {
      text: `SELECT * FROM "user" WHERE username=$1`,
      values: [ username ],
    }
    const result = await client.query(preparedQuery);
    return result.rows[0] ?? null;
  }

  static async create(newUser: RegisterInput): Promise<UserRecord> {
    const preparedQuery = {
      text: `INSERT INTO "user" (username, password) VALUES($1, $2) RETURNING *`,
      values: [
        newUser.username,
        newUser.password,
      ]
    }
    const result = await client.query(preparedQuery);
    
    return result.rows[0];
  }
}