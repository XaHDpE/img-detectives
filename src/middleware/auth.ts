import jwt, {JwtPayload, Secret} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const createToken = () => {};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.params.token ||
      req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    (req as CustomRequest).token = jwt.verify(
      token,
      process.env.API_KEY as Secret
    );
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export {verifyToken, createToken};
