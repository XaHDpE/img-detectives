/// <reference types="express-serve-static-core" />
import { Response } from 'express';
interface StatusDetails {
    success: boolean;
    message?: string;
    data?: unknown;
    error?: unknown;
}
export declare function getErrorObject(success: boolean, message?: string, error?: unknown): StatusDetails;
declare abstract class ApiError extends Error {
    readonly statusCode: number;
    readonly causedBy: unknown | undefined;
    getCode(): number;
    protected constructor(message: string, statusCode: number, causedBy?: unknown);
}
declare function defaultHttpFail(res: Response, error: unknown): Express.Response;
declare class GenericError extends ApiError {
    constructor(message: string, causedBy?: never);
}
declare class ValidationError extends ApiError {
    constructor(message: string, causedBy?: never);
}
declare class SecurityError extends ApiError {
    constructor(message: string, causedBy?: unknown);
}
declare class UnauthorizedError extends ApiError {
    constructor(message: string);
}
declare class ForbiddenError extends ApiError {
    constructor(message: string);
}
declare class NotFoundError extends ApiError {
    constructor(message: string, causedBy?: string);
}
declare class ConflictError extends ApiError {
    constructor(message: string);
}
export { defaultHttpFail, ApiError, SecurityError, UnauthorizedError, ForbiddenError, NotFoundError, GenericError, ConflictError, ValidationError, };
