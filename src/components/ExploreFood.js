import React from 'react';
import { Link } from 'react-router-dom';

function ExploreFood() {
  return (
    <Link to="/explorar/comidas">
      <button
        type="button"
        data-testid="explore-food"
        name="food-btn"
      >
        Explorar Comidas
      </button>
    </Link>

  );
}

export default ExploreFood;
