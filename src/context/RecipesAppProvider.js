import React from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  return (
    <RecipesAppContext.Provider value={{}}>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default RecipesAppProvider;
