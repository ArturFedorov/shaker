import {Http} from '../../../api/http.ts';
import {AuthConfig} from '../../../configs/AuthConfig.ts';
import {AuthKeys} from '../../auth/AuthKeys.ts';

export class UserService {

  static getCurrentUser() {
    return Http.GET<any>('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${AuthConfig.spotify[AuthKeys.ACCESS_TOKEN]}`
      }
    }).catch( er  => console.log(er))
  }
}
