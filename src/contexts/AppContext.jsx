import { getCurrentUser } from '@/services/user';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData.data.user);
    };
    const tokenFromStorage = localStorage.getItem('userToken');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      fetchUser();
    }
  }, []);

  const updateUser = useCallback((user) => {
    setUser(user);
  }, []);

  const updateToken = useCallback((token) => {
    setToken(token);
  }, []);

  const appContext = {
    user,
    setUser: updateUser,
    token,
    setToken: updateToken,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
