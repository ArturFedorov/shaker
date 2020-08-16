export class AuthService {
  static baseUrl: string = 'https://accounts.spotify.com/';
  static client_id: string = '82925db2f0554cc18280feb3aea59502';
  static client_secret: string = '9951d95fe4f94a6d8be9e63d989c94a8';
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
