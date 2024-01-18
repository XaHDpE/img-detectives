"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ConflictError = exports.GenericError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.SecurityError = exports.ApiError = exports.defaultHttpFail = exports.getErrorObject = void 0;
const statuses_1 = require("./statuses");
function getErrorObject(success, message, error) {
    return {
        success: success,
        message: message,
        error: error,
    };
}
exports.getErrorObject = getErrorObject;
class ApiError extends Error {
    getCode() {
        return this.statusCode;
    }
    constructor(message, statusCode, causedBy) {
        super(message);
        this.statusCode = statusCode;
        if (typeof causedBy !== 'undefined') {
            this.causedBy = causedBy;
        }
    }
}
exports.ApiError = ApiError;
function defaultHttpFail(res, error) {
    let errCode = 500;
    let errMsg;
    console.log('error: ' + error);
    if (Array.isArray(error) && Array(error)[0] instanceof ValidationError) {
        errCode = statuses_1.StatusEnum.BadRequest;
        errMsg = {
            validationErrors: error,
        };
    }
    else if (error instanceof ApiError) {
        errCode = error.getCode();
        errMsg = error.message;
    }
    else if (error instanceof Error) {
        errMsg = error.message;
    }
    else {
        errMsg = error;
    }
    return res.status(errCode).send({
        code: errCode,
        message: errMsg,
    });
}
exports.defaultHttpFail = defaultHttpFail;
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
    constructor(message, causedBy) {
        super(message, 500, causedBy);
    }
}
exports.GenericError = GenericError;
class ValidationError extends ApiError {
    constructor(message, causedBy) {
        super(message, statuses_1.StatusEnum.BadRequest, causedBy);
    }
}
exports.ValidationError = ValidationError;
class SecurityError extends ApiError {
    constructor(message, causedBy) {
        super(message, 502, causedBy);
    }
}
exports.SecurityError = SecurityError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ApiError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ApiError {
    constructor(message, causedBy) {
        super(message, 404, causedBy);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ApiError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=error.utils.js.map