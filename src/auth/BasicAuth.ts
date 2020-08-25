import {RouterContext} from '../../deps.ts';
import {AuthKeys} from './AuthKeys.ts';
import {AuthConfig} from '../../configs/AuthConfig.ts';

const openUrls: Map<string, RegExp[]> = new Map<string, RegExp[]>()
  .set('GET', [
    new RegExp('/login'),
    new RegExp('/token'),
    new RegExp('/token/refresh')
  ]);

export class BasicAuth {
  /**
   * Tests path using list of regexps
   * @param method Request method
   * @param path Request path
   * @returns True if at least one match was founds, otherwise false
   */
  static noAuth(method: string, path: string): boolean {
    if (!openUrls.has(method)) {
      return false;
    }
    return openUrls
            .get(method)!
            .some(pathRegExp => pathRegExp.test(path));
  }

  static authenticate(context: RouterContext, next: () => Promise<void>) {

    // ByPass authentication open API
    if (BasicAuth.noAuth(context.request.method, context.request.url.pathname)) {
      return next();
    }

    const access_token = AuthConfig.spotify[AuthKeys.ACCESS_TOKEN];
    const expiration_date = AuthConfig.spotify[AuthKeys.EXPIRATION_DATE];

    if(!access_token) {
      context.response.status = 401;
      context.response.body = 'No token provided';
      return;
    }

    if(expiration_date && new Date() >= new Date(expiration_date)) {
      context.response.redirect('/spotify/token/refresh');
      return;
    }

    return next();
  }
}
