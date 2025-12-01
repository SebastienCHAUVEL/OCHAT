import client from "../config/database.client.ts";
import type { ConversationToSave } from "../models/conversation.model.ts";

export interface ConversationRecord {
  id: number;
  title: string;
  userId: number;
}

export class ConversationDatamapper {
  static async findAllByUserId (userId: number): Promise<Array<ConversationRecord> | null> {
    const preparedQuery = {
      text: `SELECT "id", "title", "user_id" as "userId" FROM "conversation" WHERE "user_id"=$1`,
      values: [ userId ],
    }
    const result = await client.query(preparedQuery);
    return result.rows ?? null;
  }

  static async create(newConversation: ConversationToSave): Promise<ConversationRecord> {
    const preparedQuery = {
      text: `INSERT INTO "conversation" ("title", "user_id") VALUES($1, $2) RETURNING "id", "title", "user_id" as "userId"`,
      values: [
        newConversation.title,
        newConversation.userId,
      ]
    }
    const result = await client.query(preparedQuery);
    
    return result.rows[0];
  }
}