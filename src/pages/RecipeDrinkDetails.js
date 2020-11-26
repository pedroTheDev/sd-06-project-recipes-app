import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StartButton from '../components/StartButton';
import RecipesContext from '../context/RecipesAppContext';
import './scroll.css';

function RecipeDrinkDetails({ match, title }) {
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recomendation, setRecomendation] = useState([]);
  let arrIngredient = [];
  let arrMeasure = [];
  const ZERO = 0;
  const TWENTY = 20;
  const SEIS = 6;
  const API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const positionButton = { position: 'fixed' };

  const fetchDetailRecipeDrinkByID = async () => {
    const response = await fetch(`${API}${id}`);
    const json = await response.json();
    return setRecipes(json.drinks);
  };

  const fetchRecomendationsMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return setRecomendation(json.meals);
  };

  useEffect(() => {
    fetchDetailRecipeDrinkByID();
    fetchRecomendationsMeals();
  }, []);

  if (recipes.length !== ZERO) {
    const renderIngredients = () => {
      for (let i = 1; i <= TWENTY; i += 1) {
        if (recipes[0][`strIngredient${i}`]) {
          arrIngredient = arrIngredient.concat(recipes[0][`strIngredient${i}`]);
        } else {
          break;
        }
      }
    };

    const renderMeasure = () => {
      for (let i = 1; i <= TWENTY; i += 1) {
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
        <div className="scrollmenu">
          {recomendation.slice(ZERO, SEIS).map((element, index) => (
            <div key={ index } className="scrollmenu-child">
              <img
                data-testid={ `${index}-recomendation-card` }
                src={ element.strMealThumb }
                alt={ element.strMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>{ element.strMeal }</p>
            </div>
          ))}
        </div>
        <div style={ positionButton }>
          <StartButton id={ id } title={ title } />
        </div>
      </div>
    );
  }
  return <span>teste</span>;
}

RecipeDrinkDetails.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeDrinkDetails;
