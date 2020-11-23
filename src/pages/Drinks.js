import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIDrinks } from '../services';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" fetchApi={ fetchAPIDrinks } />
      <Footer />
    </div>
  );
}

export default Drinks;
