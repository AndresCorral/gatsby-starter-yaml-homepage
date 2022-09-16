import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface Info {
  title: string,
  socialLinks: {
    instagram: string,
    facebook: string,
    twitter: string,
  },
  copyright: string,
  meta: HomepageLink[],
  logo: HomepageImage,
  description: string,
}
