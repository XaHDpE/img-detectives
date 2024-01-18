import {Request, Response} from 'express';
import * as userServices from '../services/user.service';
import {defaultHttpFail} from '../utils/error.utils';
import {StatusEnum as Status} from '../utils/statuses';
import {plainToInstance} from 'class-transformer';
import {UsersInput, UsersLogin} from '../models/users';
import {authorize, findByEmail} from '../services/user.service';

export const loginOne = async (req: Request, res: Response) => {
  try {
    const userLogin = plainToInstance(UsersLogin, req.body as JSON);
    await userLogin.validate();
    const usr = await findByEmail(userLogin.email);
    const token = await authorize(usr, userLogin.password);
    return res.status(Status.Success).send({token: token});
  } catch (e) {
    return defaultHttpFail(res, e);
  }
};

export const registerOne = async (req: Request, res: Response) => {
  const userInput = plainToInstance(UsersInput, req.body as JSON);
  try {
    await userInput.validate();
    const regResult = await userServices.register(userInput);
    return res.status(Status.Success).send(regResult);
  } catch (e: unknown) {
    return defaultHttpFail(res, e);
  }
};
