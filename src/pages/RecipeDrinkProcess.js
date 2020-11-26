import React, { useEffect, useContext, useState } from 'react';
import RecipesContext from '../context/RecipesAppContext';
import { fetchDrinkById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function RecipeDrinkProcess(props) {
  const ZERO = 0;
  const VINTE = 20;
  let list = [];
  let arrIngredient = [];
  const { id } = props.match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recipeIngredient, setRecipeIngredient] = useState([]);

  const settingRecipeInProgress = async () => {
    const response = await fetchDrinkById(id);
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

  const markIngredient = (e) => {
    if (recipeIngredient.length === 0) setRecipeIngredient([e]);
    else {
      recipeIngredient.filter((ing) => (
        setRecipeIngredient((ing !== e) ? [...recipeIngredient, e] : [...recipeIngredient])
      ));
    }

    // setRecipeIngredient([...recipeIngredient, e]);
  };

  const createCheckBoxes = () => {
    const ingredients = renderIngredients();
    // setRecipeIngredient(ingredients);
    // console.log(ingredients);
    return (
      ingredients.map((ingredient, index) => (
        // <div
        // >
        <label
          key={ index }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            value={ ingredient }
            id={ ingredient }
            onChange={ () => markIngredient(ingredient) }
          />
          { ingredient }
        </label>
        // </div>
      ))
    );
  };

  useEffect(() => {
    settingRecipeInProgress();
  }, []);

  // useEffect(() => {
  //   setRecipeIngredient(renderIngredients());
  // });

  return (
    recipes.length > ZERO
      && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ recipes[0].strDrinkThumb }
            alt="imagem"
          />
          <h4
            data-testid="recipe-title"
          >
            { recipes[0].strDrink }
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

export default RecipeDrinkProcess;

// function RecipeDrinkProcess() {
//   return (
//     <span>Bebidas em procresso</span>
//   );
// }

// export default RecipeDrinkProcess;
