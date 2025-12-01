import z from "zod";

export const idNumSchema = z.coerce.number().int().min(1);
export type idNum = z.infer<typeof idNumSchema>;

export const idParamsSchema = z.object({
  id: idNumSchema,
});
export type IdParams = z.infer<typeof idParamsSchema>;