import React, { createContext, FC, useEffect, useMemo, useState } from 'react';

interface UrlDataContextValue {
  hash?: string,
  query: {
    table?: number,
  },
}

const defaultContextValue: UrlDataContextValue = {
  hash: undefined,
  query: {},
};

export const UrlDataContext = createContext<UrlDataContextValue>(defaultContextValue);

const UrlDataProvider: FC = ({ children }) => {
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    setHash(window.location.hash);

    const loadHandler = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', loadHandler);

    return () => window.removeEventListener('hashchange', loadHandler);
  }, []);

  const value = useMemo(() => {
    if (typeof window === 'undefined') return defaultContextValue;

    const { table } = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const tableNumber = Number(table);

    const parsedTable = Number.isNaN(tableNumber) ? undefined : tableNumber;

    return { hash, query: { table: parsedTable } };
  }, [hash]);

  return (
    <UrlDataContext.Provider value={value}>
      {children}
    </UrlDataContext.Provider>
  );
};

export default UrlDataProvider;
