import React from 'react';
import Header from '../components/Header';

function Comidas() {
  const value = true;
  return (
    <Header name="Comidas" button={ value } />
  );
}

export default Comidas;
