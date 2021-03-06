import { Util } from '../shared/utils/Util.ts';
import { Logger } from './Logger.ts';
import { Router } from '../deps.ts';

export class Routes {
  static async getConfiguredRoutes() {
    let routes: Router[] = [];

    const allControllers = Util.findFilesInDirectory('src/', []);
    if (!allControllers.length) {
      Logger.appLogger.info('No files of router found.');
    }

    for (const controllerPath of allControllers) {
      Logger.appLogger.info(`Register router ${controllerPath}`);
      const route: { default: Router } = await import(controllerPath);

      routes.push(route.default);
    }

    return routes;
  }
}
