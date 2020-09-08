import { Router } from '../../../deps.ts';
import {UserController} from './UserController.ts';
import {BasicAuth} from '../../auth/BasicAuth.ts';

const router = new Router({prefix: '/spotify'});
const controller = new UserController();

router
  .get('/user', BasicAuth.authenticate, controller.getCurrentUser)
  .get('/user/artists', BasicAuth.authenticate, controller.getUserTopArtists)
  .get('/user/tracks', BasicAuth.authenticate, controller.getUserTopTracks);

export default router;


