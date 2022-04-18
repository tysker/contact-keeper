import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ redirect, element }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  return !isAuthenticated && !loading ? <Navigate to={redirect} /> : element;
};

export default PrivateRoute;
