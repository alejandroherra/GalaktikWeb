import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isSuperAdmin = user.email?.toLowerCase() === 'alejandrohs@live.com';

    if (!user.emailVerified && !isSuperAdmin) {
        return <Navigate to="/verify-email" />;
    }

    if (requireAdmin && userData?.role !== 'admin') {
        // If user is logged in but not admin, redirect to dashboard or home
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
