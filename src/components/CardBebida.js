import React from 'react';
import { useHistory } from 'react-router-dom';

function CardBebida(elemento, index) {
  const history = useHistory();
  function redirectDetails(idDrinks) {
    history.push(`/bebidas/${idDrinks}`);
  }
  return (
    <div key={ elemento.idDrink } data-testid={ `${index}-recipe-card` }>
      <button type="button" onClick={ () => redirectDetails(elemento.idDrink) }>
        <h4 data-testid={ `${index}-card-name` }>{ elemento.strDrink }</h4>
        <img
          data-testid={ `${index}-card-img` }
          src={ elemento.strDrinkThumb }
          alt={ elemento.strDrink }
        />
      </button>
    </div>
  );
}

export default CardBebida;
