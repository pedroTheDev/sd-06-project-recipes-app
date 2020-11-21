import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });
  const [filter, setFilter] = useState({ text: '', option: '' });

  const contextValue = {
    header,
    setHeader,
    filter,
    setFilter,
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
