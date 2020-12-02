import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinksPage() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>

        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>

      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksPage;
