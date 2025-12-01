import type { ConversationRecord } from "../datamappers/conversation.datamapper.ts";
import type { idNum } from "../validation/utils.validation.ts";

export class Conversation {
  id: number;
  title: string;
  userId: number;

  constructor(conversation: ConversationRecord) {
    this.id = conversation.id;
    this.title = conversation.title;
    this.userId = conversation.userId;
  }
}