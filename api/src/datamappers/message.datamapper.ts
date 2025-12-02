import client from "../config/database.client.ts";
import type { createMessageInput } from "../validation/message.validation.ts";

export interface MessageRecord {
  id: number,
  content: string,
  isAiResponse: boolean,
  conversationId: number
}

export class MessageDatamapper {
  static async findAllByConversationId(conversationId: number): Promise<Array<MessageRecord> | null> {
    const preparedQuery = {
      text: `SELECT "id", "content", "is_ai_response" as "isAiResponse", "conversation_id" as "conversationId" FROM "message" WHERE "conversation_id"=$1`,
      values: [ conversationId ],
    }
    const result = await client.query(preparedQuery);
    return result.rows.length ? result.rows : null;
  }
  
  static async create(newMessage: createMessageInput): Promise<MessageRecord> {
    const preparedQuery = {
      text: `INSERT INTO "message" ("content", "is_ai_response", "conversation_id") 
        VALUES($1, $2, $3) 
        RETURNING "id", "content", "is_ai_response" as "isAiResponse", "conversation_id" as "conversationId"`,
      values: [ 
        newMessage.content,
        newMessage.isAiResponse,
        newMessage.conversationId
      ],
    }
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}
