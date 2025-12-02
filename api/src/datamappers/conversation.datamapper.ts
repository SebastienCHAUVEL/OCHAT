import client from "../config/database.client.ts";
import type { ConversationToSave } from "../models/conversation.model.ts";

export interface ConversationRecord {
  id: number;
  title: string;
  userId: number;
}

export class ConversationDatamapper {
  static async findById(id: number): Promise<ConversationRecord | null> {
    const preparedQuery = {
      text: `SELECT "id", "title", "user_id" as "userId" FROM "conversation" WHERE "id"=$1`,
      values: [ id ],
    }
    const result = await client.query(preparedQuery);
    return result.rows[0] ?? null;
  }
  static async findAllByUserId (userId: number): Promise<Array<ConversationRecord> | null> {
    const preparedQuery = {
      text: `SELECT "id", "title", "user_id" as "userId" FROM "conversation" WHERE "user_id"=$1`,
      values: [ userId ],
    }
    const result = await client.query(preparedQuery);
    return result.rows.length ? result.rows : null;
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

  static async updateTitleById(id: number, newTitle: string): Promise<ConversationRecord | null> {
    const preparedQuery = {
      text: `UPDATE "conversation" SET "title" = $1 WHERE "id"=$2 RETURNING "id", "title", "user_id" as "userId"`,
      values: [
        newTitle,
        id,
      ]
    }
    const result = await client.query(preparedQuery);
    
    return result.rows[0] ?? null;
  }

  static async removeById(id: number): Promise<number | null> {

    const preparedQuery = {
      text: `DELETE FROM "conversation" WHERE "id"=$1`,
      values: [
        id,
      ]
    }
    const result = await client.query(preparedQuery);
    
    return result.rowCount ?? null;
  }
}