import React, { createContext, useContext, ReactNode } from 'react';

interface RegistrationContextType {
  openRegistrationModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

interface RegistrationProviderProps {
  children: ReactNode;
  openModal: () => void;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
  openModal
}) => {
  return (
    <RegistrationContext.Provider value={{ openRegistrationModal: openModal }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};