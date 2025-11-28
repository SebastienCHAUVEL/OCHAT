import { Router } from "express";
import { router } from "./index.ts";
import { login, register } from "../controllers/auth.controller.ts";

export const authRouter = Router();

router.post("/register", register);
router.post("/login", login);