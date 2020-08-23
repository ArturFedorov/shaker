import { Router } from '../../../deps.ts';
import {UserController} from './UserController.ts';
import {BasicAuth} from '../../auth/BasicAuth.ts';

const userRouter = new Router({prefix: '/spotify'});
const controller = new UserController();

userRouter
  .get('/items', BasicAuth.authenticate, controller.items)
  .get('/user', controller.getCurrentUser);

export default userRouter;


