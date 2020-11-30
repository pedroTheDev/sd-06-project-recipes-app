import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const recipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const location = useLocation().pathname;
  const history = useHistory();

  const handleClickFavorite = (recipeType) => {
    if (!recipeType) {
      if (recipeStorage) {
        setFavorites(recipeStorage);
      }
    } else {
      const allRecipes = [];
      recipeStorage.forEach((recipe) => {
        if (recipe.type === recipeType) {
          allRecipes.push(recipe);
        }
      });
      setFavorites(allRecipes);
    }
  };

  useEffect(() => {
    setFavorites(recipeStorage);
  }, []);

  const handleShareIcon = () => {
    const zero = 0;
    const menosUm = -1;
    let fullPath = '';
    if (location.substr(location.length - 1) === '/') {
      fullPath = `http://localhost:3000${location.slice(zero, menosUm)}`;
    } else {
      fullPath = `http://localhost:3000${location}`;
    }
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.container-cards').appendChild(linkCopy);
  };

  const handleFavoriteRecipes = ({ target }) => {
    recipeStorage.forEach((recipe, index) => {
      if (recipe.id === target.id) {
        recipeStorage.splice(index, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
        setFavorites(recipeStorage);
      }
    });
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFavorite() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClickFavorite('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFavorite('bebida') }
        >
          Drinks
        </button>
      </div>
      <div>
        {favorites.map((recipe, index) => (
          <div key={ index } className="container-cards">
            <img
              aria-hidden="true"
              width="100px"
              src={ recipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
              onClick={
                () => (recipe.type === 'comida'
                  ? history.push(`/comidas/${recipe.id}`)
                  : history.push(`/bebidas/${recipe.id}`))
              }
            />
            { recipe.type === 'comida' ? (
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.area} - ${recipe.category}`}
              </h3>
            ) : (
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </h3>
            ) }
            <h2
              aria-hidden="true"
              data-testid={ `${index}-horizontal-name` }
              onClick={
                () => (recipe.type === 'comida'
                  ? history.push(`/comidas/${recipe.id}`)
                  : history.push(`/bebidas/${recipe.id}`))
              }
            >
              { recipe.name }
            </h2>
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShareIcon() }
              aria-hidden="true"
            />
            <img
              src={ blackHeartIcon }
              alt="favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
              id={ recipe.id }
              onClick={ handleFavoriteRecipes }
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
