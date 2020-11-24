import React, { useEffect, useState } from 'react';

function ExploreDrinksIngredients() {
  const [data, setData] = useState([]);
  const MAX_NUMBER_OF_CARDS = 12;

  const apiIngredients = async () => {
    const apiRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const response = await apiRequest.json();
    setData(response.drinks)
  }

  useEffect(() => {
    apiIngredients();
  }, []);

  return (
    data.map((drinks, index) => (
      <div key={index} data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          width="60px"
          src={`https://www.themealdb.com/images/ingredients/${drinks.strIngredient1}.png`}
        />
        <h3
          data-testid={ `${index}-card-name` }
        >{ drinks.strIngredient1 }</h3>
      </div>
    )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
  );
}

export default ExploreDrinksIngredients;
