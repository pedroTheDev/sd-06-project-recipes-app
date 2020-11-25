import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetail, fetchRecommendation } from '../helpers/Helper';
import history from '../helpers/History';

import '../css/itemDetails.css';
import '../css/scroller.css';

export default function FoodsDetails(props) {
  const [recipeId, setRecipeId] = useState('');
  const [recipe, setRecipe] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [btnStartValue, setBtnStartValue] = useState('Iniciar Receita');

  useEffect(() => {
    if (recipeId === '') {
      setRecipeId(props.match.params.id);
    }
    async function fetchData() {
      const result = await fetchDetail('bebidas', recipeId);
      setRecipe(result);
    }
    if (recipeId === props.match.params.id) {
      fetchData();
    }
  }, [recipeId]);

  useEffect(() => {
    async function fetchData() {
      const results = await fetchRecommendation('bebidas');
      setRecommendation(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      setDisabled(false);
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setBtnStartValue('Continuar Receita');
    }
  }, []);

  useEffect(() => {
    if (recipe.drinks) {
      const currRecipe = { ...recipe.drinks[0] };
      const array = [];
      const maxLength = 15;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== null
          || currRecipe[`strIngredient${number}`])
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

  function handle() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      return (
        <div>
          { recipeDetails.filter((ingredient) => ingredient !== '')
            .map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient[0] }
              >
                { (ingredient[1] === null)
                  ? `${ingredient[0]}`
                  : `${ingredient[0]}: ${(ingredient[1]) && ingredient[1]}` }
              </p>
            )) }
        </div>
      );
    }
  }
  if (recipe.drinks && recommendation) {
    const item = recipe.drinks[0];
    return (
      <div>
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strDrinkThumb }
            className="item-img"
          />
          <p data-testid="recipe-title">{item.strDrink}</p>
          <input type="button" data-testid="share-btn" value="Share" />
          <input type="button" data-testid="favorite-btn" value="favorite" />
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {handle()}
          <p data-testid="video">{item.strYoutube}</p>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btnStart"
            onClick={
              () => history.push(`/bebidas/${props.match.params.id}/in-progress`)
            }
            disabled={ disabled }
          >
            {btnStartValue}
          </button>
        </div>
        <div className="testimonials">
          <div className="scroller">
            {recommendation.map((rec, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="item"
              >
                <p data-testid={ `${index}-recomendation-title` }>{rec.strMeal}</p>
                <img
                  alt="foto da receita"
                  className="item-img"
                  src={ rec.strMealThumb }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>aloudingue</div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
