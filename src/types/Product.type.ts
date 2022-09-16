import { HomepageImage } from './Image.type';
import { HomepageLink } from './Link.types';

export interface Product {
  id?: string,
  image: HomepageImage,
  heading: string,
  text: string,
  links?: HomepageLink[],
}
