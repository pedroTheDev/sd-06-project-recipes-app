import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';
import recipesAppContext from '../context/recipesAppContext';
import { setFavoriteRecipes } from '../services/localStorage';

function SecondaryHeader({ name, img, category }) {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  // checkFavorite();

  const {
    // handleFavoriteRecipe,
    recipesMeals,
    recipesDrinks,
  } = useContext(recipesAppContext);
  console.log('contexto', recipesMeals);
  const url = `http://localhost:3000${location.pathname}`;

  const handleShareIcon = () => {
    // const url = `http://localhost:3000${location.pathname}`;
    navigator.clipboard.writeText(url);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector('.copied-link');
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };

  const handleFavoriteRecipe = () => {
    setIsFavorite(!isFavorite);
  };

  const saveToLocalStorage = () => {
    const myRecipes = location.pathname.includes('comidas') ? recipesMeals : recipesDrinks;
    // handleFavoriteRecipe();
    const favoriteMeals = [{
      id: myRecipes.idMeal,
      type: location.pathname.includes('comidas') ? 'comida' : 'bebida',
      area: myRecipes.strArea,
      category: myRecipes.strCategory,
      alcoholicOrNot: myRecipes.strAlcoholic,
      name: myRecipes.strMeal,
      image: myRecipes.strMealThumb,
    }];
    console.log('favorites', favoriteMeals);
    handleFavoriteRecipe();
    if (isFavorite) setFavoriteRecipes('favoriteRecipes', ...favoriteMeals);
    /* else {
      const favoriteDrinks = [{
        id: recipesDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: recipesDrinks.strCategory,
        alcoholicOrNot: '',
        name: recipesDrinks.strDrink,
        image: recipesDrinks.strDrinkThumb,
      }];
      console.log('favorites', favoriteDrinks);
      if (isFavorite) setFavoriteRecipes('favoriteRecipes', favoriteDrinks);
    } */
  };

  return (
    <div className="header-container">
      <header>
        <img
          data-testid="recipe-photo"
          alt={ name }
          src={ img }
        />
        <h1 data-testid="recipe-title">{ name }</h1>
        <input
          type="image"
          data-testid="share-btn"
          className="share-btn"
          src={ shareIcon }
          alt="Share recipe"
          onClick={ handleShareIcon }
        />
        <p className="copied-link" />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite recipe"
          onClick={ saveToLocalStorage }
        />
        <p data-testid="recipe-category">{ category }</p>
      </header>
    </div>
  );
}

SecondaryHeader.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};

export default SecondaryHeader;
