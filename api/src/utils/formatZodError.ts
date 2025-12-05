import type { ZodError } from "zod";

export function prettifyZodError(error: Array<ZodError>) {
  let message = "";

  error.forEach((element) => {
    message += element.message + "\n";
  });
  
  return message;
}
