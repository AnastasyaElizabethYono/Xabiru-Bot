import React, { ReactNode, createContext, useState } from 'react';

interface ContextType {
  isActionActive: boolean;
  toggleAction: () => void;
}

export const ActionContext = createContext<ContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const ActionProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isActionActive, setIsActionActive] = useState(false);

  const toggleAction = () => {
    setIsActionActive((prev) => !prev);
  };

  const contextValue: ContextType = {
    isActionActive,
    toggleAction,
  };

  return (
    <ActionContext.Provider value={contextValue}>
      {children}
    </ActionContext.Provider>
  );
};
