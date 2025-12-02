import z from "zod";
import { idNumSchema } from "./utils.validation.ts";

export const createMessageSchema = z.object({
    content: z.string().min(1),
    isAiResponse: z.coerce.boolean(),
    conversationId: idNumSchema,
  });

export type createMessageInput = z.infer<typeof createMessageSchema>;