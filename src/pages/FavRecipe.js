import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavRecipe() {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const {
    heart,
    copied,
    share,
    favorite,
    fav,
  } = useContext(Context);

  const [filter, setFilter] = useState(local);

  const filters = (type) => {
    if (type === 'comida') {
      setFilter(local.filter((item) => item.type === type));
    } else if (type === 'bebida') {
      setFilter(local.filter((item) => item.type === type));
    } else {
      setFilter(local);
    }
  };

  useEffect(() => filters(''), [fav]);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        onClick={ () => filters('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => filters('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => filters('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filter.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="thumbnail"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ `${recipe.type}_favorita` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.area ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          </Link>
          <input
            type="image"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            alt="share-icon"
            onClick={ () => share(`/${recipe.type}s/${recipe.id}`) }
          />
          { copied ? <span>Link copiado!</span> : '' }
          <input
            type="image"
            src={ heart === 'white' ? whiteHeartIcon : blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt={ heart === 'white' ? 'whiteHeartIcon' : 'blackHeartIcon' }
            onClick={ () => favorite(recipe, recipe.type, recipe.id) }
          />
        </div>
      ))}
    </div>
  );
}

export default FavRecipe;
