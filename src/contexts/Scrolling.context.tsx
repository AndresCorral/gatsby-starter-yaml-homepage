import React, { createContext, FC, useMemo, useState } from 'react';

interface ScrollingContextValue {
  scrollPosition: number,
  setScrollPosition: (position: number) => void,
}

const defaultContextValue: ScrollingContextValue = {
  scrollPosition: 0,
  setScrollPosition: () => null,
};

export const ScrollingContext = createContext<ScrollingContextValue>(defaultContextValue);

const ScrollingProvider: FC = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const value = useMemo(() => ({
    scrollPosition,
    setScrollPosition,
  }), [scrollPosition]);

  return (
    <ScrollingContext.Provider value={value}>
      {children}
    </ScrollingContext.Provider>
  );
};

export default ScrollingProvider;
