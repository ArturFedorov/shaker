import { Logger } from '../server-configs/Logger.ts';
import ApiError from './ApiError.ts';
import {HttpMethods} from './HttpMethods.ts';

export class Http {
  static GET<T>(url: string, options: RequestInit): Promise<T> {
    options.method = HttpMethods.GET;
    return this.makeRequest(url, options);
  }

  static POST<T>(url: string, options: RequestInit): Promise<T> {
    options.method = HttpMethods.POST;
    return this.makeRequest<T>(url, options);
  }


  private static makeRequest<T>(url: string, options: RequestInit) {
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error has occured');
        }

        return response.json() as Promise<T>
      })
      .catch((error) => {
        const message = `Error while requesting to ${url}. Error: ${error.message}`;
        Logger.appLogger.error(message);
        return  Promise.reject(new ApiError(message, error.code));
      })
  }
}
