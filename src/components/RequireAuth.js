import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth, setTokenExp } = useAuth();
    const location = useLocation();
    let tokenValid = false;
    let tokenSus = 0;

    if(auth?.accessToken)  {
        const tokenExpDate = JSON.parse(window.atob(auth?.accessToken.split('.')[1])).exp * 1000;
        const dateNow = Date.now();
        tokenSus = tokenExpDate - dateNow;
        tokenValid = tokenSus > 0;
    }

    useEffect(() => {
        setTokenExp(tokenSus);
    });

    return(
        auth?.accessToken && tokenValid ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;