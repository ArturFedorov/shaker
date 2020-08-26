import { Router } from '../../../deps.ts';
import {UserController} from './UserController.ts';
import {BasicAuth} from '../../auth/BasicAuth.ts';

const router = new Router({prefix: '/spotify'});
const controller = new UserController();

router
  .get('/items', BasicAuth.authenticate, controller.items)
  .get('/user', BasicAuth.authenticate, controller.getCurrentUser);

export default router;


