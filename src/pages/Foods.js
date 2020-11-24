import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchAPIRecipes } from '../services';

function Foods() {
  return (
    <div>
      <Header fetchApi={ fetchAPIRecipes } title="Comida" showSearchIcon />
      <Footer />
    </div>
  );
}

export default Foods;
