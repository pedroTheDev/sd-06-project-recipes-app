import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ExploreBebidas() {
  return (
    <div>
      <h1>Explore Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreBebidas;
