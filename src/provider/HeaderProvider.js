import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';

function HeaderProvider({ children }) {
  const [header, setHeader] = useState([true, '', true]);

  return (
    <HeaderContext.Provider value={ { header, setHeader } }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
