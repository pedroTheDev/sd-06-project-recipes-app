import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function FoodInProgress(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    setRecipe(response.meals[0]);
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
        TheIngredients
          .push(`${recipe[`strMeasure${i}`]}
            ${recipe[`strIngredient${i}`]}`);
      }
    }
    setIngredients(TheIngredients);
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
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
        />
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <ShareBtn />
        <FavoriteBtn />
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        <p>
          Ingredientes:
          {ingredients.map((ingredient, index) => (
            <label htmlFor={ `${index}-ingredient` } key={ index }>
              { ingredient }
              <input
                name="ingredient"
                key={ index }
                type="checkbox"
                id={ `${index}-ingredient` }
                data-testid={ `${index}-ingredient-step` }
                checked={ (ev) => console.log(ev.target) }
                onChange={ () => setIsDisabled(false) }
              />
            </label>
          ))}
        </p>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          isDisabled={ isDisabled }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.func.isRequired,
};

export default FoodInProgress;
