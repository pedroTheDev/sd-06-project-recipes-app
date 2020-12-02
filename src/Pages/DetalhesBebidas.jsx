import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { detailsDrinkById, showSugestedFoods } from '../services/aPI';
import './DetalhesBebidas.css';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetalhesBebidas = () => {
  const [stateLocal, setStatelocal] = useState();
  const [stateSugestions, setSugestions] = useState();
  const [drinksInProgress, setDrinksInProgress] = useState({ cocktails: {} });
  const [isFavorite, setIsFavorite] = useState(false);
  const [windowLink, setWindowLink] = useState(window.location.href);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareClick = () => {
    const url = window.location.href;

    setWindowLink(url);
    setLinkCopied(true);
  };

  const currentDrinkID = useParams().id;

  const handleIdDetails = async () => {
    const drink = await detailsDrinkById(currentDrinkID);
    console.log(drink);

    setStatelocal({ ...stateLocal, drink });
  };

  const getSugestedFoods = async () => {
    const foods = await showSugestedFoods();

    setSugestions(foods);
  };

  const loadRecipesInProgressFromLocalStorage = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setDrinksInProgress({ cocktails: progressRecipes.cocktails });
  };

  const loadFavoriteRecipesFromLocalStorage = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes[0] ? favoriteRecipes
      .find((recipe) => recipe.id === currentDrinkID) : undefined;

    if (isRecipeFavorite) setIsFavorite(true);
    else setIsFavorite(false);
  };

  useEffect(() => {
    handleIdDetails();
    getSugestedFoods();
    loadRecipesInProgressFromLocalStorage();
    loadFavoriteRecipesFromLocalStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = stateLocal.drink.drinks[0];

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== null && dataObject[key] !== '');

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const drinkProgressID = stateLocal.drink.drinks[0].idDrink;
    const inProgressRecipes = {
      ...progressRecipes,
      cocktails: {
        ...progressRecipes.cocktails,
        [drinkProgressID]: getIngredientsOrMeasure('strIngredient'),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const handleFavorite = () => {
    const currentDrink = stateLocal.drink.drinks[0];
    const recipeData = {
      id: currentDrink.idDrink,
      type: 'bebida',
      area: '',
      category: currentDrink.strCategory,
      alcoholicOrNot: currentDrink.strAlcoholic,
      name: currentDrink.strDrink,
      image: currentDrink.strDrinkThumb,
    };

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const zero = 0;
    const isAlreadyAFavorite = favoriteRecipes.length > zero
      ? favoriteRecipes.find((recipe) => recipe.id === currentDrink.idDrink) : undefined;

    if (isAlreadyAFavorite) {
      setIsFavorite(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes
        .filter((recipe) => recipe.id !== currentDrink.idDrink)]));
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favoriteRecipes, recipeData]));
    }
  };

  const number = 5;

  return (
    <div className="body-details">
      {stateLocal ? (
        <div className="container-main">
          {console.log(stateLocal)}
          <div className="container-photo">
            <img
              data-testid="recipe-photo"
              className="img-initial"
              src={ stateLocal.drink.drinks[0].strDrinkThumb }
              alt={ stateLocal.drink.drinks[0].strDrink }
            />
          </div>
          <div className="container-title">
            <span
              className="title"
              data-testid="recipe-title"
            >
              { stateLocal.drink.drinks[0].strDrink }
            </span>
            <div className="container-icons">
              <CopyToClipboard text={ windowLink } onCopy={ () => setLinkCopied(true) }>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleShareClick }
                >
                  <img
                    src={ shareIcon }
                    alt="shareIcon"
                  />
                </button>
              </CopyToClipboard>
              <button
                type="button"
                onClick={ handleFavorite }
              >
                <img
                  data-testid="favorite-btn"
                  src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                  alt={ !isFavorite ? 'whiteHeartIcon' : 'blackHeartIcon' }
                />
              </button>
              {linkCopied ? <span>Link copiado!</span> : null}
            </div>
          </div>
          <div
            className="container-cotegory"
            data-testid="recipe-category"
          >
            {stateLocal.drink.drinks[0].strCategory}
            {stateLocal.drink.drinks[0].strAlcoholic}
          </div>
          <div
            className="span-ingredients"
          >
            <span>
              Ingredients
            </span>
          </div>
          <div className="box-ingredients">
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
          <div className="container-span">
            <span>Instructions</span>
          </div>
          <div className="box-instructions">
            <span
              data-testid="instructions"
            >
              {stateLocal.drink.drinks[0].strInstructions}
            </span>
          </div>
          <div className="recomendation-span">
            <span>
              Recomendadas
            </span>
          </div>
          <div className="container-recomendations">
            { stateSugestions && stateSugestions.meals.map((meal, index) => {
              if (index <= number) {
                return (
                  <div
                    className="main-scroll"
                    key={ meal.strMeal }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <p data-testid={ `${index}-recomendation-title` }>
                      {meal.strMeal}
                    </p>
                    <button
                      type="button"
                      className="button"
                      onClick={ () => handleIdDetails(meal.idMeal) }
                    >
                      <Link to={ `/bebidas/${meal.idMeal}` }>
                        <img
                          className="img-recomendations"
                          src={ meal.strMealThumb }
                          alt={ meal.strMeal }
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
          <div className="container-button">
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressButton }
            >
              <Link
                className="link-button"
                to={ `/bebidas/${stateLocal.drink.drinks[0].idDrink}/in-progress` }
              >
                {drinksInProgress.cocktails[stateLocal.drink.drinks[0].idDrink]
                  ? 'Continuar Receita' : 'Iniciar Receita'}
              </Link>
            </button>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesBebidas;
