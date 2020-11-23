import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState('Login');
  const [showsSearchBar, setShowsSearchBar] = useState(false);

  const headerValues = {
    title,
    setTitle,
    showsSearchBar,
    setShowsSearchBar,
  };

  return (
    <HeaderContext.Provider value={ headerValues }>
      { children }
    </HeaderContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
