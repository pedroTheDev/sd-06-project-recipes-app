import PropTypes from 'prop-types';
import React from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const state = {

  };

  return (
    <ReceitasContext.Provider value={state}>
      {children}
    </ReceitasContext.Provider>
  );
};

ReceitasProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default ReceitasProvider;
