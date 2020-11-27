import React from 'react';
import PropTypes from 'prop-types';

export default function ExplorerDrinks(props) {
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => props.history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExplorerDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
