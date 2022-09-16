import { Benefit } from './Benefit.type';

export interface BenefitList {
  heading?: string,
  text?: string,
  benefits: Benefit[],
}
