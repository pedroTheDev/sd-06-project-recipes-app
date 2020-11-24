import React from 'react';
import { Header, Footer } from '../Components';
import MainScreen from '../Components/MainScreen';

function Comidas() {
  return (
    <div>
      <Header pageName='Comidas' />
      <h1>COmidas</h1>
      <MainScreen />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {};

export default Comidas;
