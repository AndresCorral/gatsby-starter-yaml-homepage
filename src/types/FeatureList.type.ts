import { Feature } from './Feature.type';

export interface FeatureList {
  kicker?: string,
  heading: string,
  text?: string,
  features: Feature[],
}
