import React, { createContext, useState, useContext } from "react";

type appContextType = {
    initialLoad: boolean;
    loaded: () => void;
}

const appContextDefaultValues: appContextType = {
    initialLoad: true,
    loaded: () => {},
};

const AppContext = createContext<appContextType>(appContextDefaultValues);

export const useAppContext = () => useContext(AppContext);

type Props = {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const loaded = () => {
        setInitialLoad(false);
    }
    const value = {
        initialLoad,
        loaded
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
