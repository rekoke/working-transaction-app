import {createContext, useState} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [tokenExp, setTokenExp] = useState(1);

    return(
        <AuthContext.Provider value={{ 
            auth, setAuth,
            tokenExp, setTokenExp
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;