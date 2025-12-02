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

  static async findById(id: number){
    const conversation = await ConversationDatamapper.findById(id);
    if(!conversation) return null;
    return new Conversation(conversation);
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

  static async updateTitleById(id: number, newTitle: string) {
    const conversationRecord = await ConversationDatamapper.updateTitleById(id, newTitle);

    if(!conversationRecord) return null;

    return new Conversation(conversationRecord);
  }

  static async removeById(id: number) {
    return await ConversationDatamapper.removeById(id);
  }
}