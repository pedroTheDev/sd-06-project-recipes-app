import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  requestApiDrinkDetails,
} from '../services/requestDrink';
import {
  recommendFoodsList,
} from '../services/requestFood';
import '../styles/Detalhes.css'
import buttonShare from '../styles/images/shareIcon.svg';

function DetalhesBebida(props) {
  const [detailsDrink, setDetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);

  useEffect(() => {
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setDetailsDrink(response[0]);
        console.log(response)
      });
  }, []);

  const ingredientsFunc = () => {
    if(detailsDrink.length !== 0) {
      const array = []
      for(let i=1;i<=15;i++) {
        const ingredient = `${detailsDrink[`strIngredient${i}`]} ${detailsDrink[`strMeasure${i}`]}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element!=='null null')
      setArrayIngredients(arrayReturn);
    } 
  }

  const recommendDrinkFunction = async () => {
    if (detailsDrink.length !== 0) {
      const response = await recommendFoodsList();
      setRecommendDrink(response.meals.slice(0, 6));
      console.log(response)
    }
  };

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink])

  if (detailsDrink.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={detailsDrink.strDrinkThumb} alt="drink-photo" />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <div data-testid="recipe-category">
        <h3>{detailsDrink.strAlcoholic}</h3>
        <h3 >{detailsDrink.strCategory}</h3>
      </div>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <button type="button" data-testid="share-btn">
        <img src={ buttonShare } />
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      {arrayIngredients.map((element, index) => {
        return (
          <h5
            data-testid={`${ index }-ingredient-name-and-measure`} 
            key={ index }>
            {element}
          </h5>
        );
      })}
      <div data-testid={ `0-recomendation-card` }>
        {recommendDrink.map((drink, index) => (
          <div key={ index }>
            <img src={ drink.strMealThumb } alt="drink-thumb" />
            <h3>{drink.strMeal}</h3>
          </div>
        ))}
      </div>
      <button type="button" data-testid="start-recipe-btn" className="btn-footer">Iniciar receita</button>
    </div>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesBebida;
