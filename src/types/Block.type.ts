import { AboutHero } from './AboutHero.type';
import { AboutLeadership } from './AboutLeadership.type';
import { FeatureList } from './FeatureList.type';
import { Hero } from './Hero.type';
import { LogoList } from './LogoList.type';
import { ProductList } from './ProductList.type';

interface BlockTypes {
  Hero: Hero,
  AboutHero: AboutHero,
  AboutLeaderShip: AboutLeadership,
  FeatureList: FeatureList,
  LogoList: LogoList,
  ProductList: ProductList,
}

export interface Block {
  id: number,
  elementId?: string,
  type: keyof BlockTypes,
  data: Record<string, unknown>,
}

export interface WithBlockData<P extends Record<string, unknown>> extends Block {
  data: P,
}
