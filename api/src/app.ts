import express from "express";
import cors from "cors";
import { router } from "./routers/index.ts";
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.ts";
import { helmetMiddleware } from "./middlewares/helmet.middleware.ts";
import { xssSanitizer } from "./middlewares/xss-sanitizer.middleware.ts";
import cookieParser from "cookie-parser";

const app = express();

// Allow Cross-Origin Requests
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// XSS protection --> clean HTTP requests data by removing/escaping malicious HTML/JS tags
app.use(xssSanitizer);

// Helmet protection --> Set secure response header
app.use(helmetMiddleware);

// Router
app.use("/api/v1", router);

// Global error middleware
app.use(globalErrorHandler);

export default app;

