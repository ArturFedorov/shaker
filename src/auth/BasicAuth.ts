import {RouterContext} from '../../deps.ts';
import {AuthKeys} from './AuthKeys.ts';
import {AuthConfig} from '../../configs/AuthConfig.ts';

const openUrls: Map<string, RegExp[]> = new Map<string, RegExp[]>()
  .set('GET', [

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
    const refresh_token = AuthConfig.spotify[AuthKeys.REFRESH_TOKEN];
    const expiration_date = AuthConfig.spotify[AuthKeys.EXPIRATION_DATE];

    if(expiration_date && new Date() >= new Date(expiration_date)) {
      context.response.redirect('/spotify/token/refresh')
    }

    return  next();
  }
}
