import React, { createContext, Dispatch, FC, useMemo, useReducer } from 'react';

import { ITopping } from '#types/Topping.type';
import { IProduct } from '#types/Product.type';
import { stateReducer } from '#lib/utils/Objects.util';

type ProductInfo = {
  productValue?: number,
  productQuantity?: number,
  notes?: string,
};

export type TSelectionOption= { quantity: number, option: ITopping | IProduct };

export type TOptionalsHash= { [key: string]:TSelectionOption };

export type TProductSelectionContextState = {optionalsHash: TOptionalsHash, productInfo: ProductInfo};

type StateAction = { newState: TOptionalsHash | ProductInfo, type: keyof TProductSelectionContextState };

interface ProductSelectionContextValue {
  selectionState: TProductSelectionContextState,
  setSelectionState: Dispatch<StateAction>,
}

const defaultState = { optionalsHash: {}, productInfo: {} };

export const productSelectionContext = createContext<ProductSelectionContextValue>({
  selectionState: defaultState,
  setSelectionState: () => null,
});

const ProductSelectionContextProvider: FC = ({ children }) => {
  const [selectionState, setSelectionState] = useReducer((state: TProductSelectionContextState, action: StateAction) => {
    const { type, newState } = action;

    const reducedState = stateReducer(state[type], newState);

    const hasChanged = state[type] !== reducedState;

    if (hasChanged) return { ...state, [type]: reducedState };

    return state;
  }, { optionalsHash: {}, productInfo: {} });

  const value = useMemo(() => ({
    selectionState,
    setSelectionState,
  }), [selectionState]);

  return (
    <productSelectionContext.Provider value={value}>
      {children}
    </productSelectionContext.Provider>
  );
};

export default ProductSelectionContextProvider;
