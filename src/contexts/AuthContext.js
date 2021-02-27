import {createContext, useContext} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = AuthContext.Provider;

export const useAuthContext = () => {
    return useContext(AuthContext);
}