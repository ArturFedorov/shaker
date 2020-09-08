import {IImage} from '../../common/IImage.ts';

export interface ITrack {
  id: string;
  genres: string[];
  href: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  next: string;
}
