import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(1),
    password: z.string()
      .min(8)
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[\W_]/, "Must contain at least one special character"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password and confirmation does not match",
      path: ["passwordConfirmation"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;