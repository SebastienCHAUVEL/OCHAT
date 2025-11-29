import { Router } from "express";
import { login, register } from "../controllers/auth.controller.ts";
import { registerSchema } from "../validation/auh.validation.ts";
import { validate } from "../middlewares/validation.middleware.ts";

export const authRouter = Router();

authRouter.post("/register", validate("body", registerSchema), register);
authRouter.post("/login", login);