import React, { useState, useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import jwt_decode from 'jwt-decode';

const SecurityLayout = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let role;

  useEffect(() => {
    // Check for Token
    if (localStorage.userToken) {
      // Decode token and get user info and expression
      const decoded = jwt_decode(localStorage.userToken);

      role = decoded.role;

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <PageLoading />;
  }

  if (!isLoggedIn || role !== 'admin') {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    return <Redirect to="/auth" />;
  }

  return children;
};

export default SecurityLayout;
