import React from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';

export default function Drinks() {
  document.title = 'Drinks';

  return (
    <div>
      <Header id="bebidas" />
      <Cards />
    </div>
  );
}
