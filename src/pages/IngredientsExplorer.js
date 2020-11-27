import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';
import { Header, IngredientCards, Footer } from '../components';

export default function IngredientsExplorer(props) {
  const { filters, setFilters } = useContext(RecipesContext);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    if (filters.category === '') {
      setFilters({
        ...filters, category: id, searchType: 'ingredientsList',
      });
    }
  });
  useSearch();

  return (
    <div>
      <Header id={ id } />
      <IngredientCards id={ id } />
      <Footer />
    </div>
  );
}

IngredientsExplorer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
