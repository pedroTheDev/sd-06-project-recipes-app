import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Bebidas() {
  const buttonIs = true;
  return (
    <>
      <Header name="Bebidas" button={ buttonIs } />
      <Footer />
    </>
  );
}

export default Bebidas;
