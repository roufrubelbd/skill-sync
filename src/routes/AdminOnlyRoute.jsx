import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useRole from '../hooks/useRole';
import LottieLoader from '../components/LottieLoader';

const AdminOnlyRoute = ({children}) => {
   const { user, loading } = useAuth()
  const location = useLocation()
  const {role} = useRole()
  if (loading) return <LottieLoader />
  if (user && role === "admin") return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
};

export default AdminOnlyRoute;