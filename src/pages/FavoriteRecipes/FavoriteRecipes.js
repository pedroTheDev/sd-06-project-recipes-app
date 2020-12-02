import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/Header';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../../images';
import recipesAppContext from '../../context/recipesAppContext';
import { getFavoriteRecipes } from '../../services/localStorage';
import { favoriteRecipe, recipeIsFavorite } from '../../services/localStorage';

function FavoritesRecipes() {
  const location = useLocation();
  const [type, setType] = useState('');
  const [isFavorite, setIsFavorite] = useState(true);
  const pixels = 200;
  const favoriteRecipes = getFavoriteRecipes();
  console.log('sort', favoriteRecipes.sort());

  const onlyDrinks = favoriteRecipes.filter((element) => element.type === 'bebida');
  const onlyFoods = favoriteRecipes.filter((element) => element.type === 'comida');
  const foods = onlyFoods.length;
  const favorites = onlyFoods.concat(onlyDrinks);

  const {
    recipesMeals,
    recipesDrinks,
  } = useContext(recipesAppContext);

  const myRecipe = location.pathname.includes('comidas') ? recipesMeals : recipesDrinks;

  const handleFavoriteRecipe = () => {
    setIsFavorite(false);
  };

  useEffect(() => {
    handleFavoriteRecipe();
  }, [myRecipe]);

  const saveToLocalStorage = () => {
    favoriteRecipe(myRecipe);
    handleFavoriteRecipe(myRecipe);
  };

  const handleShareIcon = (target) => {
    const keys = target.id.split(',');
    let urlLinkDetail = '';
    if (keys[1] === 'comida') {
      urlLinkDetail = `http://localhost:3000/comidas/${keys[0]}`;
    } else if (keys[1] === 'bebida') {
      urlLinkDetail = `http://localhost:3000/bebidas/${keys[0]}`;
    }
    copy(urlLinkDetail);
    console.log(urlLinkDetail);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector(`.copied-link-${keys[0]}`);
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };

  return (
    <div>
      <Header
        className="header"
        pageTitle="Receitas Favoritas"
      />
      <div>
        <input
          data-testid="filter-by-all-btn"
          className="btn btn-secondary"
          onClick={ () => setType('') }
          type="button"
          value="All"
        />
        <input
          data-testid="filter-by-food-btn"
          className="btn btn-secondary"
          onClick={ () => setType('comida') }
          type="button"
          value="Comidas"
        />
        <input
          data-testid="filter-by-drink-btn"
          className="btn btn-secondary"
          onClick={ () => setType('bebida') }
          type="button"
          value="Drinks"
        />
      </div>
      <div>
        {
          favorites.map((recipe, index) => {
            if (recipe.type === type || type === '') {
              let urlLinkDetail = '';
              let newIndex = 0;
              if (recipe.type === 'comida') {
                urlLinkDetail = `/comidas/${recipe.id}`;
              } else if (recipe.type === 'bebida') {
                urlLinkDetail = `/bebidas/${recipe.id}`;
              }
              if (type === 'bebida') {
                newIndex = foods;
              }
              return (
                <div key={ index }>
                  <Link to={ urlLinkDetail }>
                    <img
                      data-testid={ `${index - newIndex}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                      width={ `${pixels}px` }
                    />
                  </Link>
                  <p data-testid={ `${index - newIndex}-horizontal-top-text` }>
                    {
                      recipe.type === 'comida'
                        ? `${recipe.area} - ${recipe.category}`
                        : recipe.alcoholicOrNot
                    }
                  </p>
                  <h1>{ index - newIndex }</h1>
                  <Link to={ urlLinkDetail }>
                    <h3 data-testid={ `${index - newIndex}-horizontal-name` }>
                      { recipe.name }
                    </h3>
                  </Link>
                  <input
                    id={ `${recipe.id},${recipe.type}` }
                    type="image"
                    data-testid={ `${index - newIndex}-horizontal-share-btn` }
                    className="share-btn"
                    src={ shareIcon }
                    alt="Share recipe"
                    onClick={ ({ target }) => handleShareIcon(target) }
                  />
                  <p className={ `copied-link-${recipe.id}` } />
                  <input
                    type="image"
                    data-testid={ `${index - newIndex}-horizontal-favorite-btn` }
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt="Favorite recipe"
                    onClick={ saveToLocalStorage }
                  />
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
}

export default FavoritesRecipes;
