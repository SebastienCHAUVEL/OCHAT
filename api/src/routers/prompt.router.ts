import { Router } from "express";
import { askMistral } from "../controllers/prompt.controller.ts";

export const promptRouter = Router();

promptRouter.post("/mistral", askMistral);