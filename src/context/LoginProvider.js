import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const providerValue = {
    email, setEmail, password, setPassword,
  };
  return (
    <LoginContext.Provider value={providerValue}>
      { children }
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
