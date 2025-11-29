import z from "zod";

const messsagePromptSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string()
});
export const promptSchema = z.object({
    messages: z.array(messsagePromptSchema)
  });

export type promptInput = z.infer<typeof promptSchema>;
export type messsagePromptInput = z.infer<typeof messsagePromptSchema>;