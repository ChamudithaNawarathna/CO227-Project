import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

export type accountType = 'Passenger' | 'Bus employee' | 'Bus owner';

interface AppContextProps {
    id: string;
    setID: Dispatch<SetStateAction<string>>;
    accountType: string;
    setAccountType: Dispatch<SetStateAction<accountType>>;
    firstName: string;
    lasttName: string;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [id, setID] = useState('1234ggfdg');
    const [accountType, setAccountType] = useState<accountType>('Bus employee');
    const firstName = 'Chamuditha';
    const lasttName = 'Nawarathna';

    return (
        <AppContext.Provider value={{ id, setID, accountType, setAccountType, firstName, lasttName }}>
        {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("Error: App Context is empty");
    }
    return context;
  };
