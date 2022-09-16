import { Block } from '#types/Block.type';

export default function Fallback({ type }: Block) {
  console.warn(`No component found for: ${type}`);
  return null;
}
