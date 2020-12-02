import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../../components/Header';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../../images';
import { getFavoriteRecipes,
  favoriteRecipe,
  recipeIsFavorite,
} from '../../services/localStorage';
import { fetchDrink } from '../../services/cocktailAPI';
import { fetchMeal } from '../../services/mealAPI';

function FavoritesRecipes() {
  const [type, setType] = useState('');
  const pixels = 200;
  const [favoriteRecipes, setFavoriteRecipes] = useState(getFavoriteRecipes());

  const saveToLocalStorage = async ({ target }) => {
    const keys = target.id.split(',');
    let recipe;
    if (keys[1] === 'meal') {
      recipe = await fetchMeal('lookupIngredient', keys[0]);
      recipe = recipe.meals[0];
    } else if (keys[1] === 'drink') {
      recipe = await fetchDrink('lookupIngredient', keys[0]);
      recipe = recipe.drinks[0];
    }
    console.log(recipe);
    favoriteRecipe(recipe);
    setFavoriteRecipes(getFavoriteRecipes());
  };

  const handleShareIcon = (target) => {
    const keys = target.id.split(',');
    let urlLinkDetail = '';
    if (keys[1] === 'meal') {
      urlLinkDetail = `http://localhost:3000/comidas/${keys[0]}`;
    } else if (keys[1] === 'drink') {
      urlLinkDetail = `http://localhost:3000/bebidas/${keys[0]}`;
    }
    copy(urlLinkDetail);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector(`.copied-link-${keys[0]}`);
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };

  const minusOne = -1;
  let index = minusOne;

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
          onClick={ () => setType('meal') }
          type="button"
          value="Comidas"
        />
        <input
          data-testid="filter-by-drink-btn"
          className="btn btn-secondary"
          onClick={ () => setType('drink') }
          type="button"
          value="Drinks"
        />
      </div>
      <div>
        {favoriteRecipes.map((recipe) => {
          if (recipe.type === type || type === '') {
            let urlLinkDetail = '';
            if (recipe.type === 'meal') {
              urlLinkDetail = `/comidas/${recipe.id}`;
            } else if (recipe.type === 'drink') {
              urlLinkDetail = `/bebidas/${recipe.id}`;
            }
            index += 1;
            return (
              <div key={ index }>
                <Link to={ urlLinkDetail }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    width={ `${pixels}px` }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {
                    recipe.type === 'meal'
                      ? `${recipe.area} - ${recipe.category}`
                      : recipe.alcoholicOrNot
                  }
                </p>
                <h1>{ index }</h1>
                <Link to={ urlLinkDetail }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </h3>
                </Link>
                <input
                  id={ `${recipe.id},${recipe.type}` }
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  className="share-btn"
                  src={ shareIcon }
                  alt="Share recipe"
                  onClick={ ({ target }) => handleShareIcon(target) }
                />
                <p className={ `copied-link-${recipe.id}` } />
                <input
                  type="image"
                  id={ `${recipe.id},${recipe.type}` }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ recipeIsFavorite(recipe) ? blackHeartIcon : whiteHeartIcon }
                  alt="Favorite recipe"
                  onClick={ saveToLocalStorage }
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FavoritesRecipes;
