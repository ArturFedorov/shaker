import {ILoginConfiguration} from '../shared/interfaces/auth/ILoginConfiguration.ts';

export class AuthConfig {
  static spotify: ILoginConfiguration = {
     baseUrl:  'https://accounts.spotify.com/',
     client_id:  Deno.env.get('SPOTIFY_CLIENT_ID'),
     client_secret:  Deno.env.get('SPOTIFY_CLIENT_SECRET'),
     redirect_uri:  'http://localhost:3000/callback',
     scopes: 'user-read-private user-read-email'
  }
}
