import { ConversationDatamapper, type ConversationRecord } from "../datamappers/conversation.datamapper.ts";

export class Conversation {
  id: number;
  title: string;
  userId: number;

  constructor(conversation: ConversationRecord) {
    this.id = conversation.id;
    this.title = conversation.title;
    this.userId = conversation.userId;
  }
  static async findAllByUserId(userId: number) {
    return await ConversationDatamapper.findAllByUserId(userId);
  }
}