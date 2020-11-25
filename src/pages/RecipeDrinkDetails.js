import React, { useContext, useEffect } from 'react';

import RecipesContext from '../context/RecipesAppContext';

function RecipeDrinkDetails({ match }) {
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  let arrIngredient = [];
  let arrMeasure = [];
  const API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const fetchDetailRecipeDrinkByID = async () => {
    const response = await fetch(`${API}${id}`);
    const json = await response.json();
    return setRecipes(json.drinks);
  };

  useEffect(() => {
    fetchDetailRecipeDrinkByID();
  }, []);

  if (recipes.length !== 0) {
    const renderIngredients = () => {
      for (let i = 1; i <= 20; i++) {
        if (recipes[0][`strIngredient${i}`]) {
          arrIngredient = arrIngredient.concat(recipes[0][`strIngredient${i}`]);
        } else {
          break;
        }
      }
    };

    const renderMeasure = () => {
      for (let i = 1; i <= 20; i++) {
        if (recipes[0][`strMeasure${i}`]) {
          arrMeasure = arrMeasure.concat(recipes[0][`strMeasure${i}`]);
        } else {
          break;
        }
      }
    };
    renderMeasure();
    renderIngredients();

    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipes[0].strDrinkThumb }
          alt={ recipes[0].strDrink }
        />
        <h4 data-testid="recipe-title">
          {' '}
          { recipes[0].strDrink }
          {' '}
        </h4>
        <p data-testid="recipe-category">{recipes[0].strAlcoholic}</p>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{recipes[0].strCategory}</p>
        <ul>
          {arrIngredient.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))}
        </ul>
        <ul>
          {arrMeasure.map((measure, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { measure }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipes[0].strInstructions}</p>
        <div data-testid={ `${0}-recomendation-card` } />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    );
  }
  return <span>teste</span>;
}

export default RecipeDrinkDetails;
