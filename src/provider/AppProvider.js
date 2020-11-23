import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });
  const [options, setOptions] = useState({ text: '', option: '', category: '' });
  const [user, setUser] = useState({ email: 'email@email.com' });

  const contextValue = {
    header,
    setHeader,
    options,
    setOptions,
    user,
    setUser,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
