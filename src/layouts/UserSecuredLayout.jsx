import { useAppContext } from '@/contexts/AppContext';
import { PageLoading } from '@ant-design/pro-layout';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Redirect } from 'umi';

const SecurityLayout = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { setUser, setToken, token } = useAppContext();

  useEffect(() => {
    const flushUser = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
    };

    // Check for Token
    if (!token) {
      setIsExpired(true);
      flushUser();
    } else {
      // Decode token and get user info and expression
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setIsExpired(true);
        flushUser();
      }
    }

    setIsReady(true);
  }, [token, setToken, setUser]);

  if (!isReady) {
    return <PageLoading />;
  }

  if (isExpired) {
    return <Redirect to="/auth" />;
  }

  return children;
};

export default SecurityLayout;
