import React, { createContext, Dispatch, FC, useMemo, useReducer } from 'react';

import { TProductSelectionContextState } from './ProductSelection.context';

type SelectedProductsState = { [key: string]: TProductSelectionContextState };

type StateAction = { id?: number, newState?: TProductSelectionContextState | null };

interface SelectionContextValue {
  selectedProductsState: SelectedProductsState,
  setSelectedProductsState: Dispatch<StateAction>,
}

export const selectedProductsContext = createContext<SelectionContextValue>({
  selectedProductsState: {},
  setSelectedProductsState: () => null,
});

const SelectedProductsProvider: FC = ({ children }) => {
  const [selectedProductsState, setSelectedProductsState] = useReducer((state: SelectedProductsState, action: StateAction) => {
    const { id, newState } = action;

    if (!id || !newState) return {};

    const clonedState = { ...state };

    if (!newState) {
      if (!clonedState[id]) return clonedState;

      delete clonedState[id];

      return clonedState;
    }

    clonedState[id] = newState;

    return clonedState;
  }, {});

  const value = useMemo(() => ({
    selectedProductsState,
    setSelectedProductsState,
  }), [selectedProductsState]);

  return (
    <selectedProductsContext.Provider value={value}>
      {children}
    </selectedProductsContext.Provider>
  );
};

export default SelectedProductsProvider;
