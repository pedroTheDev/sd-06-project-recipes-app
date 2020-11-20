import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';

function LoginProvider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const contextValue = {
    user,
    setUser,
  };

  return (
    <LoginContext.Provider value={{ contextValue }}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
