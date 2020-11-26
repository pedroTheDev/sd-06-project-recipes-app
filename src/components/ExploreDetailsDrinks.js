import React from 'react';
import { Link } from 'react-router-dom';

function exploreDetailsDrinks() {
  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>

    </div>
  );
}
export default exploreDetailsDrinks;
