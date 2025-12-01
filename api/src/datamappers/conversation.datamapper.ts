import client from "../config/database.client.ts";

export interface ConversationRecord {
  id: number;
  title: string;
  userId: number;
}

export class ConversationDatamapper {
  static async findAllByUserId (userId: number): Promise<Array<ConversationRecord> | null> {
    const preparedQuery = {
      text: `SELECT * FROM "conversation" WHERE "user_id"=$1`,
      values: [ userId ],
    }
    const result = await client.query(preparedQuery);
    return result.rows ?? null;
  }
}