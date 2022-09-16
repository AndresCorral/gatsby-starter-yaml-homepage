import React, {
  createContext, FC, Reducer, useCallback, useEffect, useMemo, useReducer,
} from 'react';

import { stateReducer } from '#lib/utils/Objects.util';

export enum EScreenSizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

interface IScreenSizesRef {
  xs?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  xl?: boolean,
  xxl?: boolean,
}

interface IScreenSizesContextValue {
  isSizeEnabled: (size: EScreenSizes) => boolean,
}

const defaultContextValue = { isSizeEnabled: () => false };

export const screenSizeContext = createContext<IScreenSizesContextValue>(defaultContextValue);

const ScreenSizeProvider: FC = ({ children }) => {
  const [screenSizes, setScreenSizes] = useReducer<Reducer<IScreenSizesRef, IScreenSizesRef>>(stateReducer, { md: true });

  const getSizes = useCallback((width: number) => {
    const currentSizes: IScreenSizesRef = { xs: false, sm: false, md: false, lg: false, xl: false, xxl: false };

    if (width >= 1) currentSizes[EScreenSizes.XS] = true;
    if (width >= 576) currentSizes[EScreenSizes.SM] = true;
    if (width >= 768) currentSizes[EScreenSizes.MD] = true;
    if (width >= 992) currentSizes[EScreenSizes.LG] = true;
    if (width >= 1200) currentSizes[EScreenSizes.XL] = true;
    if (width >= 1400) currentSizes[EScreenSizes.XXL] = true;

    return currentSizes;
  }, []);

  const value = useMemo(() => ({ isSizeEnabled: (size: EScreenSizes) => !!screenSizes[size] }), [screenSizes]);

  const resizeHandler = useCallback(() => {
    setScreenSizes(getSizes(window.innerWidth));
  }, [getSizes]);

  useEffect(() => {
    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <screenSizeContext.Provider value={value}>
      {children}
    </screenSizeContext.Provider>
  );
};

export default ScreenSizeProvider;
