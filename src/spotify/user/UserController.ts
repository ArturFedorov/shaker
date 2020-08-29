import { RouterContext } from '../../../deps.ts';
import {UserService} from './UserService.ts';
import { getQuery } from '../../../deps.ts';

export class UserController {
  public async getCurrentUser(context: RouterContext) {
    context.response.body = await UserService.getCurrentUser();
  }

  public async getUserTopArtists(context: RouterContext) {
    const { limit, offset } = getQuery(context, { mergeParams: true});
    context.response.body = await UserService.getUserTopArtists(limit, offset);
  }

  public async getUserTopTracks(context: RouterContext) {
    const { limit, offset } = getQuery(context, { mergeParams: true});
    context.response.body = await UserService.getUserTopTracks(limit, offset);
  }
}

