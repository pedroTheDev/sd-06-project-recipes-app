import React from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';

export default function Foods() {
  document.title = 'Comidas';

  return (
    <div>
      <Header id="comidas" />
      <Cards />
    </div>
  );
}
