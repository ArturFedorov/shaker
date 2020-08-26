import { Router } from '../../../deps.ts';
import {PlaylistController} from './PlaylistController.ts';
import {BasicAuth} from '../../auth/BasicAuth.ts';

const router = new Router({prefix: '/spotify'});
const controller = new PlaylistController();

router
  .get('/playlist/me', BasicAuth.authenticate, controller.getUserPlayList);

export default router;


