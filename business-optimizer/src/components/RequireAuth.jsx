import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const RequireAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
