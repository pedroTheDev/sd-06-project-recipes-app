import React from 'react';
import { Header, Footer } from '../Components';
import MainScreen from '../Components/MainScreen';

function Bebidas() {
  return (
    <div>
      <Header pageName="Bebidas" />
      <h1>Bebidas</h1>
      <MainScreen />
      <Footer />
    </div>
  );
}

export default Bebidas;
