import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  requestApiDrinkDetails,
  requestApiDrinkFilterIngredient } from '../services/requestDrink';

function DetalhesBebida(props) {
  const [detailsDrink, setDetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);

  const zero = 0;
  const seis = 6;
  const vinte = 20;

  useEffect(() => {
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setDetailsDrink(response[0]);
      });
  }, []);

  const ingredientsFunc = () => {
    if (detailsDrink.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i + 1) {
        const ingredient = detailsDrink[`strIngredient${i}`];
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '');
      setArrayIngredients(arrayReturn);
    }
  };

  const recommendDrinkFunction = async () => {
    if (detailsDrink.length !== zero) {
      const response = await requestApiDrinkFilterIngredient(detailsDrink.strIngredient1);
      setRecommendDrink(response.slice(zero, seis));
      console.log(response);
    }
  };

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink]);

  if (detailsDrink.length === zero) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img alt="recPhoto" data-testid="recipe-photo" src={ detailsDrink.strDrinkThumb } />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <h3 data-testid="recipe-category">{detailsDrink.strCategory}</h3>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {element}
        </h5>
      ))}
      <div data-testid="0-recomendation-card">
        {recommendDrink.map((drink, index) => (
          <div key={ index }>
            <img alt="DrinkPhoto" src={ drink.strDrinkThumb } />
            <h3>{drink.strDrink}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

DetalhesBebida.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DetalhesBebida;
