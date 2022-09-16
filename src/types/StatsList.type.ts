import { AboutStats } from './AboutStats.type';
import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface StatsList {
  icon?: HomepageImage,
  kicker?: string,
  heading: string,
  text?: string,
  stats: AboutStats[],
  links: HomepageLink[],
  image?: HomepageImage,
}
