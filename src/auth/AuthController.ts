import { RouterContext } from '../../deps.ts';
import { AuthConfig } from '../../configs/AuthConfig.ts';
import { getQuery } from '../../deps.ts';
import {AuthService} from './AuthService.ts';
import {http} from '../../api/http.ts';
import {ITokenResponse} from '../../shared/interfaces/auth/ITokenResponse.ts';
import {IAuthService} from '../../shared/interfaces/auth/IAuthService.ts';
import {AuthKeys} from './AuthKeys.ts';

let stateKey = 'spotify_auth_state';
const service = new AuthService(AuthConfig.spotify);

export class AuthController {
  private service: IAuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  public login(context: RouterContext) {
    context.cookies.set(stateKey, service.state);
    context.response.body = `${AuthConfig.spotify.baseUrl}authorize?${service.configureLoginParams()}`;
  }

  public async getToken(context: RouterContext) {
    const body = await context.request.body();
    const { code, state } = body.value;

    const storedState = context.cookies ? context.cookies.get(stateKey) : null;


    if (state === null || state != storedState) {
      context.response.status = 500;
      context.response.body = { message: 'state_mismatch' };
    } else {
      context.cookies.set(stateKey, null);
      const newSearchParams = new URLSearchParams();

      newSearchParams.set('code', code || '');
      newSearchParams.set('redirect_uri', AuthConfig.spotify.redirect_uri!);
      newSearchParams.set('grant_type', 'authorization_code');



      try {
        const { access_token, refresh_token, expires_in} = await http.POST<ITokenResponse>(`${AuthConfig.spotify.baseUrl}api/token`, {
          headers: service.setAuthHeaders(),
          body: newSearchParams
        });

        Deno.env.set(AuthKeys.ACCESS_TOKEN, access_token);
        Deno.env.set(AuthKeys.REFRESH_TOKEN, refresh_token);
        Deno.env.set(AuthKeys.EXPIRES_IN, expires_in.toString());

        context.response.body = {access_token, refresh_token, expires_in};
      } catch (e) {
        context.response.status = e.code;
        context.response.body = { message: e.message };
      }
    }
  }

  public async refreshToken(context: RouterContext) {
    const body = await context.request.body();
    const { refresh_token } = body.value;

    const params = new URLSearchParams();
    params.set(AuthKeys.REFRESH_TOKEN, refresh_token);
    params.set('grant_type', AuthKeys.REFRESH_TOKEN);

    try {
      const { access_token, expires_in } = await http.POST<ITokenResponse>(`${AuthConfig.spotify.baseUrl}api/token`, {
        headers: service.setAuthHeaders(),
        body: params
      });

      Deno.env.set(AuthKeys.ACCESS_TOKEN, access_token);
      Deno.env.set(AuthKeys.EXPIRES_IN, expires_in.toString());

      context.response.body = { access_token };
    } catch (e) {
      context.response.status = e.code;
      context.response.body = { message: e.message };
    }
  }
}
