import type { NextFunction, Request, Response } from "express";
import { HttpError, UnauthorizedError } from "../utils/errors.ts";
import jwt from "jsonwebtoken";
import z from "zod";
import { prettifyZodError } from "../utils/formatZodError.ts";

// Error handler middleware (when error is thrown, express catch it and look for a middleware with 4 parameters: error, req, res, next)
export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  
  // If we throw our custom HttpError(ex: 404 NOT FOUND)
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // If error is sent from jsonwebtoken -> error 401 UNAUTHORIZED 
  if (error instanceof jwt.TokenExpiredError) { 
    res.status(401).json({ error: `Expired JWT token` });
    return;
  }
  if (error instanceof jwt.JsonWebTokenError) { 
    res.status(401).json({ error: `JWT error: ${error.message}` });
    return;
  }

  // If error is related to validation -> error 422 UNPROCESSABLE ENTITY
  if (error instanceof z.ZodError) {
    res.status(422).json({ error: prettifyZodError(JSON.parse(error.message)) });
    return; 
  }

  console.error(error);

  // Unexpected error --> error 500 INTERNAL SERVER ERROR
  res.status(500).json({ error: "Unexpected server error" });
}