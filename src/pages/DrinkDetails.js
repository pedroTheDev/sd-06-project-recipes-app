import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useRequestFood from '../hooks/useRequestFood';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [requestDetails, setrequestDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [apiResponse, setFilter] = useRequestFood([]);
  const maxShow = 6;

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setrequestDetails(response.drinks[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const zero = 0;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (requestDetails.length !== zero
        && requestDetails[`strIngredient${i}`] !== null
        && requestDetails[`strIngredient${i}`] !== ''
        && requestDetails[`strIngredient${i}`] !== undefined
      ) {
        TheIngredients
          .push(`${requestDetails[`strMeasure${i}`]}
            ${requestDetails[`strIngredient${i}`]}`);
      }
    }
    setIngredients(TheIngredients);
  };

  const handleInitRecipe = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  useEffect(() => {
    requestIngredients();
  }, [requestDetails]);

  useEffect(() => {
    requestDetailsAPI();
    setFilter({ text: '', option: '', category: '' });
  }, []);
  return (
    <div data-testid="drink-details" className="food-details">
      <img
        className="pictureDetail"
        src={ requestDetails.strDrinkThumb }
        alt={ requestDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{requestDetails.strDrink}</h1>
      <ShareBtn />
      <FavoriteBtn />
      <p data-testid="recipe-category">{requestDetails.strAlcoholic}</p>
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <ul>
            <li data-testid={ `${index}-ingredient-name-and-measure` }>{ingredient}</li>
          </ul>
        </div>
      ))}

      <p data-testid="instructions">{requestDetails.strInstructions}</p>
      <h3>Receitas Recomendadas</h3>
      <div className="recomended">
        {apiResponse.filter((e, index) => e && index < maxShow).map((meal, index) => (
          <div
            className="mini-card"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
            <img
              className="mini-picture"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>))}
      </div>
      <button
        onClick={ handleInitRecipe }
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
