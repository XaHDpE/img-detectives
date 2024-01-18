import {Response} from 'express';
import {StatusEnum} from './statuses';

interface StatusDetails {
  success: boolean;
  message?: string; // Optional message
  data?: unknown; // Optional data on success
  error?: unknown; // Optional error information on failure
}

export function getErrorObject(
  success: boolean,
  message?: string,
  error?: unknown
): StatusDetails {
  return {
    success: success,
    message: message,
    error: error,
  };
}

abstract class ApiError extends Error {
  public readonly statusCode: number;
  public readonly causedBy: unknown | undefined;

  getCode(): number {
    return this.statusCode;
  }

  protected constructor(
    message: string,
    statusCode: number,
    causedBy?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    if (typeof causedBy !== 'undefined') {
      this.causedBy = causedBy;
    }
  }
}

function defaultHttpFail(res: Response, error: unknown): Express.Response {
  let errCode = 500;
  let errMsg;
  console.log('error: ' + error);
  if (Array.isArray(error) && Array(error)[0] instanceof ValidationError) {
    errCode = StatusEnum.BadRequest;
    errMsg = {
      validationErrors: error,
    };
  } else if (error instanceof ApiError) {
    errCode = error.getCode();
    errMsg = error.message;
  } else if (error instanceof Error) {
    errMsg = error.message;
  } else {
    errMsg = error as string;
  }
  return res.status(errCode).send({
    code: errCode,
    message: errMsg,
  });
}

/*
export class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause: any;

    constructor({name, message, cause}: { name: T; message: string; cause: any;}) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }

}
*/

class GenericError extends ApiError {
  constructor(message: string, causedBy?: never) {
    super(message, 500, causedBy);
  }
}

class ValidationError extends ApiError {
  constructor(message: string, causedBy?: never) {
    super(message, StatusEnum.BadRequest, causedBy);
  }
}

class SecurityError extends ApiError {
  constructor(message: string, causedBy?: unknown) {
    super(message, 502, causedBy);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string, causedBy?: string) {
    super(message, 404, causedBy);
  }
}

class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

export {
  defaultHttpFail,
  ApiError,
  SecurityError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  GenericError,
  ConflictError,
  ValidationError,
};
