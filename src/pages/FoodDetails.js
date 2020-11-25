import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Recommended from '../components/Recommended';
import { fetchRecipe } from '../services/api';
import handleFavorite from '../services/storageFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import clipboardCopy from 'clipboard-copy';
import './FoodDetails.css';

function FoodDetails() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const sliceNumber = 9;
  const itemId = useLocation().pathname.slice(sliceNumber);
  const itemUrl = useLocation().pathname;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj.meals);
      setIsFetching(false);
    })();
    favoriteStatus(itemId);
  }, []);

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const max = 20;
    for (index; index <= max; index += 1) {
      if (recipeData[`strIngredient${index}`] !== null
        && recipeData[`strIngredient${index}`] !== '') {
        ingredientsArray.push({
          ingredient: recipeData[`strIngredient${index}`],
          quantity: recipeData[`strMeasure${index}`],
        });
      }
    }
    return ingredientsArray;
  }

  const data = (isFetching) ? [{}] : recipe;
  const { strMeal,
    strCategory,
    strArea,
    strInstructions,
    strYoutube = '',
    strMealThumb } = data[0];
  const vidUrl = strYoutube.replace(/watch\?v=/g, '/embed/');
  const ingredients = ingredientsFunc(data[0]);

  const favoriteObj = {
    id: itemId,
    type: 'comida',
    area: strArea,
    alcoholicOrNot: '',
    category: strCategory,
    name: strMeal,
    image: strMealThumb,
  }

  function handleFavoriteClick() {
    handleFavorite(favoriteObj);
    favoriteStatus(itemId);
  }

  function favoriteStatus(itemId) {
    let favoriteStatus = JSON.parse(localStorage.getItem('favorites'));
    if (favoriteStatus === null) favoriteStatus = [];
    (favoriteStatus.includes(itemId)) ? setIsFavorite(true) : setIsFavorite(false);
  }

  function handleShareClick() {
    clipboardCopy(`http://localhost:3000/${itemUrl}`);
    const shareBtn = document.getElementById('share-button');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <main>
      {(isFetching) ? <div>Loading recipe...</div>
        : (
          <section className="body-recipe">
            <h1 data-testid="recipe-title">
              { strMeal }
            </h1>
            <h3 data-testid="recipe-category">
              { strCategory }
            </h3>
            <img
              data-testid="recipe-photo"
              className="recipe-img"
              src={ strMealThumb }
              alt={ `${strMeal}` }
            />
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareClick }>
              <img src={ shareIcon } alt="Compartilhar"/>
              Compartilhar
            </button>
            {(copied) && <span>Link copiado!</span>}
            <button
              type="button"
              onClick={ handleFavoriteClick }
            >
              <img data-testid="favorite-btn" src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favoritar"/>
              Favoritar
            </button>
            <iframe
              data-testid="video"
              src={ vidUrl }
              title={ strMeal }
            />
            <div>
              {ingredients.map((ingredient, index) => (
                <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {`${ingredient.ingredient} - ${(ingredient.quantity === null)
                    ? 'a pinch'
                    : ingredient.quantity}`}
                </p>
              ))}
            </div>
            <p data-testid="instructions">
              {strInstructions}
            </p>
            <Recommended />
            <button
              type="button"
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </section>
        )}
    </main>
  );
}

export default FoodDetails;
