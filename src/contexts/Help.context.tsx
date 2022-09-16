import React, { createContext, FC, useMemo, useState } from 'react';

interface HelpContextValue {
  showHelp: boolean,
  setShowHelp: (showHelp: boolean) => void,
}

export const helpContext = createContext<HelpContextValue>({ showHelp: false, setShowHelp: () => null });

const HelpProvider: FC = ({ children }) => {
  const [showHelp, setShowHelp] = useState(false);

  const value = useMemo(() => ({
    showHelp,
    setShowHelp,
  }), [showHelp]);

  return (
    <helpContext.Provider value={value}>
      {children}
    </helpContext.Provider>
  );
};

export default HelpProvider;
