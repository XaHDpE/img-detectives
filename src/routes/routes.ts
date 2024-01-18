import * as userController from '../controllers/user.controller';
import * as roomController from '../controllers/room.controller';
import {Router, json} from 'express';
import {verifyToken} from '../middleware/auth';

const routes = Router();

routes.use(json());

routes.post('/login', userController.loginOne);

routes.post('/register', userController.registerOne);

routes.get('/welcome', verifyToken, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

routes.get('/', (req, res) => {
  res.send("What's up doc ?!");
});

// rooms
routes.get('/room', verifyToken, roomController.lobbyList);

export default routes;
