import { MessageDatamapper, type MessageRecord } from "../datamappers/message.datamapper.ts";
import type { createMessageInput } from "../validation/message.validation.ts";

export class Message {
  id: number;
  content: string;
  isAiResponse: boolean;
  conversationId: number;

  constructor(message: MessageRecord) {
    this.id = message.id;
    this.content = message.content;
    this.isAiResponse = message.isAiResponse;
    this.conversationId = message.conversationId;
  }

  static async findAllByConversationId(conversationId: number) {
    const messageRecords = await MessageDatamapper.findAllByConversationId(conversationId);

    if(!messageRecords) return null;

    return messageRecords.map((msg) => new Message(msg));
  }

  static async create(newMessage: createMessageInput) {
    const messageRecord = await MessageDatamapper.create(newMessage);

    return new Message(messageRecord);
  }
}