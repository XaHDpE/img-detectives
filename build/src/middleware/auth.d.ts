import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export interface CustomRequest extends Request {
    token: string | JwtPayload;
}
declare const createToken: () => void;
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export { verifyToken, createToken };
