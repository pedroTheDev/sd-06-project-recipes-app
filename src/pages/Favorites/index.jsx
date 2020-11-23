import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import { useRecipes } from '../../hooks/recipes';

import shareIcon from '../../images/shareIcon.svg';
import heartIcon from '../../images/blackHeartIcon.svg';

function Favorites() {
  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  const [copyLink, setCopyLink] = useState(() => {
    const doneIDs = favoriteRecipes.map((recipe) => recipe.id);

    const copiedIDs = {};

    doneIDs.forEach((id) => {
      copiedIDs[id] = false;
    });

    return doneIDs;
  });

  const [filter, setFilter] = useState('all');

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'foods':
        return favoriteRecipes.filter((recipe) => recipe.type === 'comida');
      case 'drinks':
        return favoriteRecipes.filter((recipe) => recipe.type === 'bebida');
      default:
        return favoriteRecipes;
    }
  }, [favoriteRecipes, filter]);

  const handleFilterChange = useCallback(({ target }) => {
    const { value: filterClicked } = target;

    setFilter(filterClicked);
  }, []);

  const handleShareClick = useCallback((id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;

    navigator.clipboard.writeText(url);

    const copiedRecipe = {
      [id]: true,
    };

    setCopyLink(copiedRecipe);
  }, []);

  const handleRecipeUnfavorite = useCallback((id) => {
    const dataToUnfavorite = { id };

    updateFavoriteRecipes(dataToUnfavorite, true);
  }, [updateFavoriteRecipes]);

  return (
    <div className="favorite-recipes-page">
      <Header pageName="Receitas Favoritas" />

      <div className="done-filters-container">
        <label htmlFor="all" data-testid="filter-by-all-btn">All</label>
        <input
          type="radio"
          name="filter"
          id="all"
          value="all"
          checked={filter === 'all'}
          onChange={handleFilterChange}
        />
        <label htmlFor="foods" data-testid="filter-by-food-btn">Foods</label>
        <input
          type="radio"
          name="filter"
          id="foods"
          value="foods"
          onChange={handleFilterChange}
          checked={filter === 'foods'}

        />
        <label htmlFor="drinks" data-testid="filter-by-drink-btn">Drinks</label>
        <input
          type="radio"
          name="filter"
          id="drinks"
          value="drinks"
          checked={filter === 'drinks'}
          onChange={handleFilterChange}

        />
      </div>

      <div className="favorite-recipes-container">
        {filteredItems.map((recipe, index) => (
          <div className="done-recipe-card" key={`${recipe.type}-${recipe.name}`}>
            <Link to={`/${recipe.type}s/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.name} data-testid={`${index}-horizontal-image`} />
            </Link>

            <Link
              to={`/${recipe.type}s/${recipe.id}`}
              data-testid={`${index}-horizontal-name`}
            >
              {recipe.name}
            </Link>

            <p data-testid={`${index}-horizontal-top-text`}>
              {recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}` : `${recipe.alcoholicOrNot}`}
            </p>

            {/* {recipe.type === 'comida' && (
              <p data-testid={`${index}-horizontal-area`}>{recipe.area}</p>
            )} */}

            {/* {recipe.type === 'bebida' && (
              <p data-testid={`${index}-horizontal-alcoholic`}>{recipe.alcoholicOrNot}</p>
            )} */}

            <div className="done-recipe-share-container">
              <button
                type="button"
                onClick={() => handleShareClick(recipe.id, recipe.type)}
              >
                <img
                  src={shareIcon}
                  alt="share this recipe"
                  data-testid={`${index}-horizontal-share-btn`}
                />
              </button>

              {copyLink[recipe.id] && (
                <p>Link copiado!</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleRecipeUnfavorite(recipe.id, recipe.type)}
            >
              <img
                data-testid={`${index}-horizontal-favorite-btn`}
                src={heartIcon}
                alt="unfavorite this recipe"
              />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
