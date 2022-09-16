import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface Hero {
  image?: HomepageImage,
  kicker?: string,
  h1: string,
  subhead: string,
  text: string,
  links: HomepageLink[],
}
