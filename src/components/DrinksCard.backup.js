import React, { useContext } from 'react';

import ReceitasContext from '../context/ReceitasContext';

function DrinksCard() {
  const { meals } = useContext(ReceitasContext);
  const doze = 12;
  return (
    <div>
      {meals.filter((_, index) => index < doze)
        .map((drink, index) => (
          <div
            className="drink-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="drink-img"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3 className="drink-name" data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </h3>
          </div>
        ))}
    </div>
  );
}

export default DrinksCard;
