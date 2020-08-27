import { SpotifyRepository } from '../SpotifyRepository.ts';
import { ISpotifyUser } from '../../../shared/interfaces/user/ISpotifyUser.ts';
import {ITrackResponse} from '../../../shared/interfaces/api/ITrackResponse.ts';

export class UserService {
  static getCurrentUser(): Promise<ISpotifyUser> {
    return SpotifyRepository.GET<ISpotifyUser>('/me');
  }

  static getUserTopTracks(limit = '20', offset = '0'): Promise<ITrackResponse> {
    return SpotifyRepository.GET<ITrackResponse>(`/me/top/tracks`); //?offset=${offset}&limit=${limit}
  }
}
