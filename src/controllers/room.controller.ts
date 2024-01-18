import {Request, Response} from 'express';

export const lobbyList = async (req: Request, res: Response) => {
  return res.status(200).send('rooms');
};
