import {AuthConfig} from '../../configs/AuthConfig.ts';
import {AuthKeys} from '../auth/AuthKeys.ts';
import {Http} from '../../api/http.ts';

export class SpotifyRepository {

  static baseUrl: string = 'https://api.spotify.com/v1';

  static GET<T>(url: string): Promise<T> {
    const path = `${this.baseUrl}${url}`;

    return Http.GET<T>(path, {
      headers: {
        Authorization: `Bearer ${AuthConfig.spotify[AuthKeys.ACCESS_TOKEN]}`
      }
    });
  }
}
