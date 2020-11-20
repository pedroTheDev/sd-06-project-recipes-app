import React from 'react';
import Header from '../components/Header';
import { fetchAPIDrinks } from '../services';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" fetchApi={ fetchAPIDrinks } />
    </div>
  );
}

export default Drinks;
