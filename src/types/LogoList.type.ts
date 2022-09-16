import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface LogoList {
  text?: string,
  logos: HomepageImage[],
}

export interface AboutLogoList {
  heading?: string,
  links: HomepageLink[],
  logos: HomepageImage[],
}
