import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface Feature {
  id?: string,
  image?: HomepageImage,
  kicker?: string,
  heading: string,
  text: string,
  links: HomepageLink[],
}
