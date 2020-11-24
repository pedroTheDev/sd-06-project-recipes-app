import React from 'react';
import { useLocation } from 'react-router-dom';

function DetalhesBebida() {
  const { state } = useLocation();
  const { recipe: { strDrinkThumb, strDrink } } = state;
  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } />
      <h1>{ strDrink }</h1>
      <span>Aqui vão estar os detalhes da bebida...</span>
    </div>
  );
}

export default DetalhesBebida;
