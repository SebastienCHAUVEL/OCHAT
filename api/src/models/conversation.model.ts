import { ConversationDatamapper, type ConversationRecord } from "../datamappers/conversation.datamapper.ts";
import type { createConversationInput } from "../validation/conversation.validation.ts";

export interface ConversationToSave extends createConversationInput {
  userId: number
}

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
    const conversationsRecord = await ConversationDatamapper.findAllByUserId(userId);
    if(!conversationsRecord) return null;
    return conversationsRecord.map((conversation) => new Conversation(conversation));
  }

  static async create(newConversation: ConversationToSave) {
    const conversationRecord = await ConversationDatamapper.create(newConversation);
    return new Conversation(conversationRecord);
  }
}