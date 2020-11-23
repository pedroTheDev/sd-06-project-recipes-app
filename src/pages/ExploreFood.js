import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood() {
  return (
    <>
      <Header title="Explorar Comidas" />
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Link>
      <Link
        to="/comidas/52771"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </>
  );
}

export default ExploreFood;
