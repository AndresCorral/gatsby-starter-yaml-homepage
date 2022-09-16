import { Block } from './Block.type';
import { HomepageLink } from './Link.types';

export interface Sections {
  menu: HomepageLink[],
  cta: HomepageLink,
  blocks: Block[],
}
