import {IUser} from './IUser.ts';

export interface ISpotifyUser extends IUser {
  country: string;
  display_name: string;
  href: string;
  external_urls: {
    spotify: string;
  }
  followers: {
    href?: string;
    total: number;
  }
  images: { url: string } [],
  product: string;
  type: string;
  uri: string;
}
