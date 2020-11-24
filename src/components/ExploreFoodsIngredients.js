import React, { useEffect, useState } from 'react';

function ExploreFoodsIngredients() {
  const [data, setData] = useState([]);
  const MAX_NUMBER_OF_CARDS = 12;

  const apiIngredients = async () => {
    const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const response = await apiRequest.json();
    setData(response.meals)
  }

  useEffect(() => {
    apiIngredients();
  }, []);

  return (
    data.map((meals, index) => (
      <div key={index} data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          width="60px"
          src={`https://www.themealdb.com/images/ingredients/${meals.strIngredient}.png`}
        />
        <h3
          data-testid={ `${index}-card-name` }
        >{ meals.strIngredient }</h3>
      </div>
    )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
  );
}

export default ExploreFoodsIngredients;
