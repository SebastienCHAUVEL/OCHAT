export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // On appelle le contructeur de la classe parente

    this.statusCode = statusCode;
  }
}

// "Tu n'as pas fourni le JWT, ou bien il n'est pas valide"
export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

// "Tu as fourni le JWT, mais tu n'as pas les droits/rôles nécessaires"
export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message: string) {
    super(message, 502);
  }
}