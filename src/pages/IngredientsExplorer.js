import React from 'react';
import PropTypes from 'prop-types';
import { HeaderNoSearch, IngredientCards, Footer } from '../components';

export default function IngredientsExplorer(props) {
  const { match: { params: { id } } } = props;
  document.title = id;

  return (
    <div>
      <HeaderNoSearch id={ id } />
      <IngredientCards id={ id } />
      <Footer />
    </div>
  );
}

IngredientsExplorer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
