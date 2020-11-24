import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [fetching, setFetching] = useState(true);

  const state = {
    meals,
    setMeals,
    searchBox,
    setSearchBox,
    fetching,
    setFetching,
  };

  return (
    <ReceitasContext.Provider value={ state }>
      {children}
    </ReceitasContext.Provider>
  );
};

ReceitasProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default ReceitasProvider;
