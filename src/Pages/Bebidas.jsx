import React from 'react';
import propTypes from 'prop-types';
import { Header, Footer } from '../Components';

function Bebidas({ history }) {
  return (
    <div>
      <Header pageName="Bebidas" history={ history } />
      <h1>Bebidas</h1>
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: propTypes.arrayOf(Object).isRequired,
};

export default Bebidas;
