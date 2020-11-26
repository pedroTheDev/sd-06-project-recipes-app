import React, { useState, useEffect } from 'react';
import findMatchInKeys from '../helpers/assets';

export default function RecipeCard({ recipe, recipeIndex, pathname }) {
  const [thumbKey, setthumbKey] = useState();
  const [name, setName] = useState();

  const getMatcherByUrl = () => {
    const nameByurl = {
      '/comidas': 'strMeal',
      '/bebidas': 'strDrink',
    };
    return nameByurl[pathname];
  };

  useEffect(() => {
    setthumbKey(findMatchInKeys(/Thumb/, recipe));
    setName(getMatcherByUrl());
  }, []);

  const renderRecipeImg = () => (
    <img
      src={ recipe[thumbKey] }
      alt="recipe-img"
      className="main__page__recipe-img"
      data-testid={ `${recipeIndex}-card-img` }
    />
  );

  const renderRecipeTextData = () => (
    <p
      data-testid={ `${recipeIndex}-card-name` }
    >
      {recipe[name]}
    </p>
  );

  const renderRecipeDetails = () => (
    <>
      {renderRecipeImg()}
      {renderRecipeTextData()}
    </>
  );

  const render = () => {
    if (thumbKey) {
      return (
        <div
          className="main__page__recipe-card"
          data-testid={ `${recipeIndex}-recipe-card` }
        >
          {renderRecipeDetails()}
        </div>
      );
    }
    return null;
  };

  return render();
}
