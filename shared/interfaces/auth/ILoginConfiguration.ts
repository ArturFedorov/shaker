import {AuthKeys} from '../../../src/auth/AuthKeys.ts';

export interface ILoginConfiguration {
  client_id?: string;
  scopes?: string;
  redirect_uri?: string;
  state?: string;
  client_secret?: string;
  baseUrl?: string;
  [AuthKeys.ACCESS_TOKEN]: string;
  [AuthKeys.EXPIRATION_DATE]: number;
  [AuthKeys.REFRESH_TOKEN]: string;
  [AuthKeys.EXPIRES_IN]: number;
}
