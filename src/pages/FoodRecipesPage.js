import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';

function FoodRecipesPage() {
  return (
    <div>
      <Header pageName="Comidas" />
      <Filters />
    </div>
  );
}

export default FoodRecipesPage;
