export class AuthService {
  static baseUrl: string = 'https://accounts.spotify.com/';
  static client_id: string = Deno.env.get('SPOTIFY_CLIENT_ID') as string;
  static client_secret: string = Deno.env.get('SPOTIFY_CLIENT_SECRET') as string;
  static redirect_uri: string = 'http://localhost:3000/callback';
  static scopes: string = 'user-read-private user-read-email';

  static generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
