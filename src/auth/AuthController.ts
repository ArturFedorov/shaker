import { RouterContext } from '../../deps.ts';
import { router } from '../Router.ts';
import { AuthConfig } from '../../configs/AuthConfig.ts';
import { getQuery } from '../../deps.ts';
import {AuthService} from './AuthService.ts';
import {http} from '../../api/http.ts';
import {ITokenResponse} from '../../shared/interfaces/auth/ITokenResponse.ts';

let stateKey = 'spotify_auth_state';
const service = new AuthService(AuthConfig.spotify);

router
  .get('/login', (context: RouterContext) => {
    context.cookies.set(stateKey, service.state);
    context.response.body = `${AuthConfig.spotify.baseUrl}authorize?${service.configureLoginParams()}`;
  })
  .post('/token', async (context: RouterContext) => {
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

        context.response.body = {access_token, refresh_token, expires_in};
      } catch (e) {
        context.response.status = e.code;
        context.response.body = { message: e.message };
      }
    }

  })
  .get('/refresh_token', async (context: RouterContext) => {
    const {refresh_token} = getQuery(context, {mergeParams: true});

    const params = new URLSearchParams();
    params.set('refresh_token', refresh_token);
    params.set('grant_type', 'refresh_token');

    const response = await fetch('${AuthService.baseUrl}api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${window.btoa(`${AuthConfig.spotify.client_id}:${AuthConfig.spotify.client_secret}`)}`
      },
      body: params
    });

    const { access_token } = await response.json();

    context.response.body =  { access_token };

  });

export default router;
