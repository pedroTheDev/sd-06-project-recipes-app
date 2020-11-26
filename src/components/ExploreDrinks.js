import React from 'react';
import { Link } from 'react-router-dom';

function ExploreDrinks() {
  return (
    <Link to="/explorar/bebidas">
      <button
        type="button"
        data-testid="explore-drinks"
        name="drinks-btn"
      >
        Explorar Bebidas
      </button>
    </Link>

  );
}

export default ExploreDrinks;
