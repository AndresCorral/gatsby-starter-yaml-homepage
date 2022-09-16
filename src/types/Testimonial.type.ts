import { HomepageImage } from './Image.type';

export interface Testimonial {
  id: string,
  avatar: HomepageImage,
  quote: string,
  source: string,
}

export interface TestimonialList {
  kicker?: string,
  heading: string,
  testimonials: Testimonial[],
}
