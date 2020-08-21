import { Router } from '../../deps.ts';
import {AuthController} from './AuthController.ts';
import {AuthConfig} from '../../configs/AuthConfig.ts';
import {AuthService} from './AuthService.ts';

const spotifyRouter = new Router({prefix: '/spotify'});
const controller = new AuthController(new AuthService(AuthConfig.spotify));

spotifyRouter
  .get('/login', controller.login)
  .post('/token', controller.getToken)
  .post('/token/refresh', controller.refreshToken);

export default spotifyRouter;
