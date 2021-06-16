import {createContext, useContext} from 'react';

const SessionContext = createContext(null);

export const SessionProvider = SessionContext.Provider;

export const useSessionContext = () => {
    return useContext(SessionContext);
}