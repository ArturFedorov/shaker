import {ILoginConfiguration} from '../shared/interfaces/auth/ILoginConfiguration.ts';
import {AuthKeys} from '../src/auth/AuthKeys.ts';

export class AuthConfig {
  static spotify: ILoginConfiguration = {
     baseUrl:  'https://accounts.spotify.com/',
     client_id:  Deno.env.get('SPOTIFY_CLIENT_ID'),
     client_secret:  Deno.env.get('SPOTIFY_CLIENT_SECRET'),
     redirect_uri:  'http://localhost:8080',
     scopes: 'user-read-private user-read-email',
     [AuthKeys.ACCESS_TOKEN]: '',
     [AuthKeys.REFRESH_TOKEN]: '',
     [AuthKeys.EXPIRES_IN]: 0,
     [AuthKeys.EXPIRATION_DATE]: 0
  }
}
