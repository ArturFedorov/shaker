import {AuthConfig} from '../../configs/AuthConfig.ts';
import {AuthKeys} from '../auth/AuthKeys.ts';
import {Http} from '../../api/http.ts';

export class SpotifyRepository {

  static GET<T>(url: string): Promise<T> {
    return Http.GET<T>(url, {
      headers: {
        Authorization: `Bearer ${AuthConfig.spotify[AuthKeys.ACCESS_TOKEN]}`
      }
    })
  }
}
