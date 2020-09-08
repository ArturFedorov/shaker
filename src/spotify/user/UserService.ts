import { SpotifyRepository } from '../SpotifyRepository.ts';
import { ISpotifyUser } from '../../../shared/interfaces/user/ISpotifyUser.ts';
import {ITrackResponse} from '../../../shared/interfaces/api/ITrackResponse.ts';

export class UserService {
  static getCurrentUser(): Promise<ISpotifyUser> {
    return SpotifyRepository.GET<ISpotifyUser>('/me');
  }

  private static getUserTopData(parameter: string, limit = '20', offset = '0') {
    return SpotifyRepository.GET<ITrackResponse>(`/me/top/${parameter}?offset=${offset}&limit=${limit}`);
  }

  static getUserTopArtists(limit: string, offset: string): Promise<ITrackResponse> {
    return this.getUserTopData('artists', limit, offset);
  }

  static getUserTopTracks(limit: string, offset: string): Promise<ITrackResponse> {
    return this.getUserTopData('tracks', limit, offset);
  }
}
