import { createContext, useState } from "react";
// import { AuthState } from "../types/auth.type";

export interface AuthState {
    accessToken?: string
    isLoggedIn: boolean
}

export interface AuthStore{
    auth: AuthState
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>
    
}


const AuthContext = createContext<AuthStore>({} as AuthStore);

export const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState<AuthState>({} as AuthState);


    return (
        <AuthContext.Provider value={{ auth ,setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;