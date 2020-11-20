import React from 'react';
import Header from '../components/Header';
import { fetchAPIRecipes } from '../services';

function Foods() {
  return (
    <div>
      <Header fetchApi={fetchAPIRecipes} title="Comida" />
    </div>
  );
}

export default Foods;
