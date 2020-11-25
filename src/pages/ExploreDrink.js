import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrink() {
  return (
    <>
      <Header title="Explorar Bebidas" />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/bebidas/178319"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </>
  );
}

export default ExploreDrink;
