import {ITrack} from '../playlist/ITrack.ts';

export interface ITrackResponse {
  items: ITrack;
  next: string;
  previous: string;
  total: number;
  limit: number;
  href: string;
}
