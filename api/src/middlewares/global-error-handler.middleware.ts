import type { NextFunction, Request, Response } from "express";
import { HttpError, UnauthorizedError } from "../utils/errors.ts";
import jwt from "jsonwebtoken";
import z from "zod";

// Error handler middleware (when error is thrown, express catch it and look for a middleware with 4 parameters: error, req, res, next)
export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  
  // If we throw our custom HttpError(ex: 404 NOT FOUND)
  if (error instanceof HttpError) {
    console.info(error);
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // If error is sent from jsonwebtoken -> error 401 UNAUTHORIZED 
  if (error instanceof jwt.JsonWebTokenError) { 
      throw new UnauthorizedError(`JWT error: ${error.message}`);
    }
    if (error instanceof jwt.TokenExpiredError) { 
      throw new UnauthorizedError(`Expired JWT token`);
    }

  // If error is related to validation -> error 422 UNPROCESSABLE ENTITY
  if (error instanceof z.ZodError) {
    // Alors, on renvoie une 422
    console.info(error);
    res.status(422).json({ error: z.prettifyError(error) });
    return; 
  }
  console.error(error);

  // Unexpected error --> error 500 INTERNAL SERVER ERROR
  res.status(500).json({ error: "Unexpected server error" });
}