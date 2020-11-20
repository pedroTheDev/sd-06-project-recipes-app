import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });

  return (
    <AppContext.Provider value={{ header, setHeader }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
