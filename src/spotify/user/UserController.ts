import { RouterContext } from '../../../deps.ts';
import {AuthKeys} from '../../auth/AuthKeys.ts';
import {AuthConfig} from '../../../configs/AuthConfig.ts';
import {UserService} from './UserService.ts';

export class UserController {
  public items = (context: RouterContext) => {
    let x = {
      hello: 12
    };
    let p = new Proxy(x, {
      get(target, key) {
        console.log('Getting', target, key);
        return target
      },
      set: function (obj, prop, value) {
        console.log('Setting', obj, prop, value);
        return true;
      }
    });
    // console.log(p);
    // x.hello = 14;
    console.log(AuthConfig.spotify[AuthKeys.ACCESS_TOKEN]);
    console.log(AuthConfig.spotify[AuthKeys.REFRESH_TOKEN]);
    console.log(AuthConfig.spotify[AuthKeys.EXPIRES_IN]);

    console.log(AuthConfig.spotify[AuthKeys.EXPIRATION_DATE]);
    console.log(context.request.url);

    context.response.body = 'HEllo2';
  }

  public async getCurrentUser(context: RouterContext) {
    context.response.body = await UserService.getCurrentUser();
  }
}

