import { HomepageImage } from './Image.type';

export interface Benefit {
  id: string,
  image?: HomepageImage,
  heading: string,
  text: string,
}
