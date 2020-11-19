import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUserData] = useState(() => {
    const previousUserData = JSON.parse(localStorage.getItem('user'));

    if (previousUserData) {
      return previousUserData;
    }

    return {};
  });

  const [userToken, setUserToken] = useState(() => {
    const existentMealsToken = localStorage.getItem('mealsToken');

    if (existentMealsToken) {
      return existentMealsToken;
    }

    return null;
  });

  const signIn = useCallback(({ email }) => {
    const userDataToPersist = { email };
    const AUTH_TOKEN = '1';

    setUserData(userDataToPersist);
    setUserToken(AUTH_TOKEN);

    localStorage.setItem('user', JSON.stringify(userDataToPersist));
    localStorage.setItem('mealsToken', AUTH_TOKEN);
    localStorage.setItem('cocktailsToken', AUTH_TOKEN);
  }, []);

  const signOut = useCallback(() => {
    setUserData({});

    localStorage.removeItem('user');
  }, []);

  return (
    <authContext.Provider value={{
      user, userToken, signIn, signOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { AuthProvider, useAuth };
