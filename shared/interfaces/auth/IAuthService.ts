export interface IAuthService {
  state: string;
  configureLoginParams: Function,
  setAuthHeaders: Function
}
