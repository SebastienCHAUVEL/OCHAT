import { Router } from "express";
import { askLlm } from "../controllers/prompt.controller.ts";

export const promptRouter = Router();

promptRouter.post("/", askLlm);