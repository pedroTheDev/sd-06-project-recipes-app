import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import StartButton from '../components/StartButton';
import RecipesContext from '../context/RecipesAppContext';
import '../Style/scroll.css';

function RecipeDrinkDetails(props) {
  const { match } = props;
  const { title } = props;
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recomendation, setRecomendation] = useState([]);
  const [share, setShare] = useState(false);
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

    const copyClip = async () => {
      const { location: { pathname } } = props;
      setShare(true);
      const url = `http://localhost:3000${pathname}`;
      await copy(url);
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
        <div>
          <button
            type="button"
            onClick={ () => copyClip() }
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          {share && <span>Link copiado!</span>}
        </div>
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
          <div>
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
      </div>
    );
  }
  return <span>teste</span>;
}

RecipeDrinkDetails.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDrinkDetails;
