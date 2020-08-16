import { RouterContext } from '../../deps.ts';
import { router } from '../Router.ts';
import {AuthService} from './AuthService.ts';
import { getQuery } from '../../deps.ts';

let state = AuthService.generateRandomString(16);
let stateKey = 'spotify_auth_state';

router
  .get('/login', (context: RouterContext) => {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', AuthService.client_id);
    params.set('scope', AuthService.scopes);
    params.set('redirect_uri', AuthService.redirect_uri);
    params.set('state', state);

    context.cookies.set(stateKey, state);

    context.response.redirect(`${AuthService.baseUrl}authorize?${params}`);
})
  .get('/callback', async (context: RouterContext) => {

    const params = getQuery(context, {mergeParams: true});
    const code = params.code || null;
    const state = params.state || null;
    const storedState = context.cookies ? context.cookies.get(stateKey) : null;


    if (state === null || state != storedState) {
      const searchParams = new URLSearchParams();
      searchParams.set('error', 'state_mismatch')
      // context.response.redirect(`/#${searchParams}`);
      context.response.status = 500;
      context.response.body = { message: 'state_mismatch' };
    } else {
      context.cookies.set(stateKey, null);
      const newSearchParams = new URLSearchParams();

      newSearchParams.set('code', code ? code : '');
      newSearchParams.set('redirect_uri', AuthService.redirect_uri);
      newSearchParams.set('grant_type', 'authorization_code');
      // newSearchParams.set('grant_type', 'client_credentials')

      let authOptions = {
        url: `${AuthService.baseUrl}api/token`,
        form: newSearchParams,
        headers: {
          'Authorization': `Basic ${window.btoa(`${AuthService.client_id}:${AuthService.client_secret}`)}`,
          'Content-Type':'application/x-www-form-urlencoded'
        }
      };

      try {
        const response = await fetch(authOptions.url, {
          method: 'POST',
          headers: authOptions.headers,
          body: authOptions.form
        })

        const { access_token, refresh_token, expires_in} = await response.json();

        return fetch(`https://api.spotify.com/v1/me`, {
          headers: { 'Authorization': `Bearer ${access_token}`}
        }).then( async (response) => {
          const user = await response.json();
          // context.response.status = 200;

          context.response.body = {user, access_token, refresh_token, expires_in};
        }).catch((error) => {
          context.response.status = 500;
          context.response.body = { message: error.message };
        })

      } catch (e) {
        context.response.status = 500;
        context.response.body = { message: 'invalid_token' };
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
        'Authorization': `Basic ${window.btoa(`${AuthService.client_id}:${AuthService.client_secret}`)}`
      },
      body: params
    });

    const { access_token } = await response.json();

    context.response.body =  { access_token };

  });
export default router;
