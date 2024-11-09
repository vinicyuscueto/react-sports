import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicRoutes = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
