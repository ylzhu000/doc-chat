import React, { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) return children;
};

export default AuthGuard;
