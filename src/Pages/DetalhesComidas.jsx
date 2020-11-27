import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { detailsFoodById, showSugestedDrinks } from '../services/aPI';
import './DetalhesComida.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetalhesComida = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [foodsInProgress, setFoodsInProgress] = useState({ meals: {} });
  const [stateFavorite, setStateFavorite] = useState({
    heart: false,
  });

  const idFood = useParams().id;

  const handleIdDetails = async () => {
    const recipeById = await detailsFoodById(idFood);

    setStatelocal({
      ...stateLocal,
      food: recipeById,
    });
  };

  const getSugestedFoods = async () => {
    const drinks = await showSugestedDrinks();

    setSugestions(drinks);
  };

  const loadLocalStorage = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    if (localStorage.getItem('heart') === null) {
      localStorage.setItem('heart', (false));
    }
    setStateFavorite({ heart: JSON.parse(localStorage.getItem('heart')) });

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setFoodsInProgress({ meals: progressRecipes.meals });
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedFoods();
    loadLocalStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.food.meals[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ');

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealProgressID = stateLocal.food.meals[0].idMeal;
    const inProgressRecipes = {
      ...progressRecipes,
      meals: {
        ...progressRecipes.meals,
        [mealProgressID]: getIngredientsOrMeasure('strIngredient'),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const handleFavorite = () => {
    setStateFavorite({
      heart: !stateFavorite.heart,
    });

    const favoriteRecipes = [{
      id: stateLocal.food.meals[0].idMeal,
      type: 'comida',
      area: stateLocal.food.meals[0].srtArea,
      category: stateLocal.food.meals[0].strCategory,
      alcoholicOrNot: '',
      name: stateLocal.food.meals[0].strMeal,
      image: stateLocal.food.meals[0].strMealThumb,
    }];

    const heartBlack = {
      heart: !stateFavorite.heart,
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    localStorage.setItem('heart', JSON.stringify(heartBlack));
  };

  const number = 5;

  return (
    <div className="main-principal">
      {stateLocal ? (
        <div className="container-main">
          {console.log(JSON.parse(localStorage.getItem('heart')).heart)}
          <div className="container-initial">
            <img
              data-testid="recipe-photo"
              className="img-initial"
              src={ stateLocal.food.meals[0].strMealThumb }
              alt={ stateLocal.food.meals[0].strMeal }
            />
            <div className="title-e-icons">
              <div
                className="category"
                data-testid="recipe-category"
              >
                {stateLocal.food.meals[0].strCategory}
              </div>
              <span data-testid="recipe-title">
                { stateLocal.food.meals[0].strMeal }
              </span>
              <div>
                <button
                  type="button"
                >
                  <img
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="shareIcon"
                  />
                </button>
                <button
                  type="button"
                  onClick={ handleFavorite }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ !stateFavorite.heart ? whiteHeartIcon : blackHeartIcon }
                    alt={ !stateFavorite.heart ? 'whiteHeartIcon' : 'blackHeartIcon' }
                  />
                </button>
              </div>
            </div>
            <div className="ingredients">
              <span>Ingredients</span>
              <ul>
                {getIngredientsOrMeasure('strIngredient').map((ingred, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ i }
                  >
                    {`${ingred} - ${getIngredientsOrMeasure('strMeasure')[i]}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <span>Instructions</span>
              <div data-testid="instructions">
                {stateLocal.food.meals[0].strInstructions}
              </div>
            </div>
            <div className="video">
              <span>Video</span>
              <a
                data-testid="video"
                href={ stateLocal.food.meals[0].strYoutube }
              >
                <img
                  src={ stateLocal.food.meals[0].strMealThumb }
                  alt={ stateLocal.food.meals[0].strMeal }
                />
              </a>
            </div>
            <span>Recomendadas</span>
            <div className="main-recomendations">
              { stateSugestions && stateSugestions.drinks.map((drink, index) => {
                if (index <= number) {
                  return (
                    <div
                      className="main-scroll"
                      key={ drink.strDrink }
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <p data-testid={ `${index}-recomendation-title` }>
                        {drink.strDrink}
                      </p>
                      <button
                        type="button"
                        className="button"
                        onClick={ () => handleIdDetails(drink.idDrink) }
                      >
                        <Link to={ `/comidas/${drink.idDrink}` }>
                          <img
                            className="img-recomendations"
                            width="200"
                            src={ drink.strDrinkThumb }
                            alt={ drink.strDrink }
                            data-testid={ `${index}-card-img` }
                          />
                        </Link>
                      </button>
                    </div>
                  );
                }
                return '';
              })}
            </div>
            <div className="button-initial-recipe">
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ progressButton }
              >
                <Link
                  className="link-button"
                  to={ `/comidas/${stateLocal.food.meals[0].idMeal}/in-progress` }
                >
                  {foodsInProgress.meals[stateLocal.food.meals[0].idMeal]
                    ? 'Continuar Receita' : 'Iniciar Receita'}
                </Link>
              </button>
            </div>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesComida;
