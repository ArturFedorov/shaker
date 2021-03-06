import {Util} from '../../shared/utils/Util.ts';
import {ILoginConfiguration} from '../../shared/interfaces/auth/ILoginConfiguration.ts';
import {IAuthService} from '../../shared/interfaces/auth/IAuthService.ts';

export class AuthService implements IAuthService {
  state = Util.generateRandomString(16);

  private config: ILoginConfiguration;

  constructor(config: ILoginConfiguration) {
    this.config = config;
  }

  configureLoginParams() {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', this.config.client_id!);
    params.set('scope', this.config.scopes!);
    params.set('redirect_uri', this.config.redirect_uri!);
    params.set('state', this.state);

    return params;
  }

  setAuthHeaders() {
    return {
      'Authorization': `Basic ${window.btoa(`${this.config.client_id}:${this.config.client_secret}`)}`,
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }
}
