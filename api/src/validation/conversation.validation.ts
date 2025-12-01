import z from "zod";

export const createConversationSchema = z.object({
    title: z.string().min(1),
  });

export type createConversationInput = z.infer<typeof createConversationSchema>;
