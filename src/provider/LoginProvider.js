import React from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';

function LoginProvider({ children }) {
  const contextValue = {};

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
