import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface Cta {
  id?: string,
  kicker?: string,
  heading: string,
  text: string,
  links: HomepageLink[],
  image?: HomepageImage,
}
