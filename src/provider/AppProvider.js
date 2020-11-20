import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });
  const [filter, setFilter] = useState({ text: '', option: '' });

  return (
    <AppContext.Provider value={ { header, setHeader, filter, setFilter } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
