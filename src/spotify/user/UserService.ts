import { SpotifyRepository } from '../SpotifyRepository.ts';
import { ISpotifyUser } from '../../../shared/interfaces/user/ISpotifyUser.ts';

export class UserService {
  static getCurrentUser(): Promise<ISpotifyUser> {
    return SpotifyRepository.GET<ISpotifyUser>('https://api.spotify.com/v1/me');
  }
}
