import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import './RecipeInProgress.css';

function DrinkInProgress(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setRecipe(response.drinks[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const zero = 0;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (recipe.length !== zero
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        const ingredient = {
          id: i,
          value: `${recipe[`strMeasure${i}`]}${recipe[`strIngredient${i}`]}`,
          isChecked: false,
        };
        TheIngredients.push(ingredient);
      }
    }
    setIngredients(TheIngredients);
  };

  const verifyIngredientsChecked = () => {
    const isAllChecked = !ingredients
      .some((ingredient) => ingredient.isChecked === false);
    setIsDisabled(!isAllChecked);
  };

  const handleCheckedIngredient = (event, index) => {
    const ingredientsChecked = [...ingredients];
    ingredientsChecked[index].isChecked = event.target.checked;
    setIngredients(ingredientsChecked);
    verifyIngredientsChecked();
  };

  useEffect(() => {
    requestIngredients();
  }, [recipe]);

  useEffect(() => {
    requestDetailsAPI();
  }, []);

  const handleFinishedRecipe = (event) => {
    event.preventDefault();
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <form onSubmit={ handleFinishedRecipe }>
        <img
          className="picture"
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
        />
        <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
        <ShareBtn />
        <FavoriteBtn />
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        <ul>
          Ingredientes:
          {ingredients.map((ingredient, index) => (
            <li data-testid={ `${index}-ingredient-step` } key={ index }>
              { ingredient.value }
              <input
                key={ ingredient.id }
                type="checkbox"
                value={ ingredient.value }
                checked={ ingredient.isChecked }
                onChange={ (ev) => handleCheckedIngredient(ev, index) }
              />
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          disabled={ isDisabled }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.func.isRequired,
};

export default DrinkInProgress;
