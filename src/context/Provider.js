import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from './RevenueContext';

const Provider = ({ children }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const context = {
    email, password, setEmail, setPassword,
  };
  return (
    <RevenueContext.Provider value={ context }>
      {children}
    </RevenueContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
