import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function UserProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  //if userInfo exist, redirect it to the children's protected route
  return userInfo && userInfo.isUser ? children : <Navigate to="/" />;
}
