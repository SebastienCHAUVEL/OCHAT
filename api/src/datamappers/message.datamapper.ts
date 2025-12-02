import client from "../config/database.client.ts";

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
}