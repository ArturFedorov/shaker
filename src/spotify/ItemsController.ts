import { RouterContext } from '../../deps.ts';
import {AuthKeys} from '../auth/AuthKeys.ts';

export class ItemsController {
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
    console.log(Deno.env.get(AuthKeys.REFRESH_TOKEN));
    console.log(Deno.env.get(AuthKeys.ACCESS_TOKEN));
    console.log(Deno.env.get(AuthKeys.EXPIRES_IN));
    console.log(context.request.url);
    context.response.body = 'HEllo2';
  }
}

