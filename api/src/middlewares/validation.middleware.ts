import { log } from "console";
import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

type DataSource = "body" | "params" | "query";

export const validate = (dataSource: DataSource, schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // req[dataSource] => req.body  or req.params or req.query...
    await schema.parseAsync(req[dataSource]);
    next();
  };
};