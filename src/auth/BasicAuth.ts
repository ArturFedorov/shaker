import {RouterContext} from '../../deps.ts';

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

  static authenticate(context: RouterContext, next: any) {

    // ByPass authentication open API
    if (BasicAuth.noAuth(context.request.method, context.request.url.pathname)) {
      return next();
    }

    next();
  }
}
