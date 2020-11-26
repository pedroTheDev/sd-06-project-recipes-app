import React, { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesAppContext';
import { fetchMealById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function RecipeFoodProcess(props) {
  const ZERO = 0;
  const VINTE = 20;
  let arrIngredient = [];
  const { id } = props.match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);

  const settingRecipeInProgress = async () => {
    const response = await fetchMealById(id);
    setRecipes(response);
  };

  const renderIngredients = () => {
    for (let i = 1; i <= VINTE; i += 1) {
      if (recipes[0][`strIngredient${i}`]) {
        arrIngredient = arrIngredient.concat(recipes[0][`strIngredient${i}`]);
      } else {
        break;
      }
    }
    return arrIngredient;
  };

  const createCheckBoxes = () => {
    const ingredients = renderIngredients();
    console.log(ingredients);
    return (
      ingredients.map((ingredient, index) => (
        <label
          key={ index }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            value={ ingredient }
            id={ ingredient }
          />
          { ingredient }
        </label>
      ))
    );
  };

  useEffect(() => {
    settingRecipeInProgress();
  }, []);

  return (
    recipes.length > ZERO
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipes[0].strMealThumb }
            alt="imagem"
          />
          <h4
            data-testid="recipe-title"
          >
            { recipes[0].strMeal }
          </h4>
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="compartilhar"
          />
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="Favoritar"
          />
          <h5
            data-testid="recipe-category"
          >
            {recipes[0].strCategory}
          </h5>
          <div className="checkbox">
            { createCheckBoxes() }
          </div>
          <p data-testid="instructions">{ recipes[0].strInstructions }</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      )
  );
}

export default RecipeFoodProcess;
