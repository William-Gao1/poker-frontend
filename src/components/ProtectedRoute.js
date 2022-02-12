import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';


const ProtectedRoute =  ({ children, adminOnly, ...rest }) => {
    if (!isLoggedIn()) {
        return <Navigate to='/login' />
    }
    return <Outlet />
};

export default ProtectedRoute