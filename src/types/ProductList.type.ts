import { Product } from './Product.type';

export interface ProductList {
  kicker?: string,
  heading: string,
  text?: string,
  products: Product[],
}
