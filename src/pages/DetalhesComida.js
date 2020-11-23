import React from 'react';
import { useLocation } from 'react-router-dom';

function DetalhesComida() {
  const { state } = useLocation();
  const { recipe: { strMealThumb, strMeal } } = state;
  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } />
      <h1>{ strMeal }</h1>
      <span>Aqui vão estar os detalhes de comidas...</span>
    </div>
  );
}

export default DetalhesComida;
