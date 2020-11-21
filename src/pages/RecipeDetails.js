import React from 'react';
import DrinkDetails from '../components/DrinkDetails';
import FoodDetails from '../components/FoodDetails';
import './RecipeDetails.css';

function RecipeDetails() {
  return (
    <main>
      <FoodDetails />
      <DrinkDetails />
    </main>
  );
}

export default RecipeDetails;
