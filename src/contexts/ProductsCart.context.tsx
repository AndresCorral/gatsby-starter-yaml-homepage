import React, { createContext, FC, useCallback, useMemo, useState } from 'react';

import { IProduct, IShopProduct } from '#types/Product.type';
import { ITopping } from '#types/Topping.type';

type Optional = { option: ITopping | IProduct, quantity: number };

export type CartProduct = { product: IShopProduct, optionals: Optional[], value: number, valueWithDiscount: number, quantity: number, note?: string};

// If We do a post MVP, instead of a fixed state only store product/option ids and quantities as prices and
// discounts could change anytime, same for product selection selection state
export type CartState = { totalValue: number, totalValueWithDiscount: number, cartProducts: CartProduct[]};

interface CartContextValue {
  showCart: boolean,
  cartState: CartState,
  setShowCart: (show: boolean) => void,
  setAddProduct: (product: CartProduct) => void,
  setRemoveProduct: (productIdx: number) => void,
  setClearCart: () => void,
}

const defaultCartContextValue = {
  showCart: false,
  cartState: { totalValue: 0, totalValueWithDiscount: 0, cartProducts: [] },
  setShowCart: () => null,
  setAddProduct: () => null,
  setRemoveProduct: () => null,
  setClearCart: () => null,
};

const CART_KEY = 'cartState';
const ONE_DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export const productsCartContext = createContext<CartContextValue>(defaultCartContextValue);

function getStateFromStorage() {
  if (typeof window === 'undefined') return defaultCartContextValue.cartState;

  const { createdAt, state } = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

  if (!state || !createdAt) return defaultCartContextValue.cartState;

  if (createdAt + ONE_DAY_MILLISECONDS < Date.now()) return defaultCartContextValue.cartState;

  return state;
}

function setStateOnStorage(state: CartState) {
  localStorage.setItem(CART_KEY, JSON.stringify({ state, createdAt: Date.now() }));
}

const ProductsCartProvider: FC = ({ children }) => {
  const [cartState, setCartState] = useState<CartState>(getStateFromStorage);

  const [showCart, setShowCart] = useState(false);

  const setStateAndStorage = useCallback((newState: CartState) => {
    setStateOnStorage(newState);
    setCartState(newState);
  }, []);

  const setAddProduct = useCallback((product: CartProduct) => {
    const { cartProducts, totalValue, totalValueWithDiscount } = cartState;

    setStateAndStorage({
      totalValue: totalValue + product.value,
      totalValueWithDiscount: totalValueWithDiscount + product.valueWithDiscount,
      cartProducts: [...cartProducts, product],
    });
  }, [cartState, setStateAndStorage]);

  const setRemoveProduct = useCallback((idx: number) => {
    const { cartProducts, totalValue, totalValueWithDiscount } = cartState;

    if (!cartProducts[idx]) return;

    const newProducts = [...cartProducts];
    const [removedProduct] = newProducts.splice(idx, 1);

    setStateAndStorage({
      totalValue: totalValue - removedProduct.value,
      totalValueWithDiscount: totalValueWithDiscount - removedProduct.valueWithDiscount,
      cartProducts: newProducts,
    });
  }, [cartState, setStateAndStorage]);

  const setClearCart = useCallback(() => {
    setStateAndStorage(defaultCartContextValue.cartState);
  }, [setStateAndStorage]);

  const value = useMemo(() => ({
    showCart,
    cartState,
    setShowCart,
    setAddProduct,
    setRemoveProduct,
    setClearCart,
  }), [showCart, cartState, setShowCart, setAddProduct, setRemoveProduct, setClearCart]);

  return (
    <productsCartContext.Provider value={value}>
      {children}
    </productsCartContext.Provider>
  );
};

export default ProductsCartProvider;
