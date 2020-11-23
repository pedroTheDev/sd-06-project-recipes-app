import React, { useState, useEffect } from 'react';
import findMatchInKeys from '../helpers/assets';

export default function RecipeResults({ recipe }) {
  const [thumbKey, setthumbKey] = useState();

  useEffect(() => {
    setthumbKey(findMatchInKeys(/Thumb/, recipe));
  }, []);

  const renderRecipeImg = () => (
    <img
      src={ recipe[thumbKey] }
      alt="recipe-img"
      className="main__page__recipe-img"
    />
  );

  const renderRecipeTextData = () => (
    Object.keys(recipe)
      .filter((key) => key !== thumbKey)
      .map((key, index) => <p key={ `key ${index}` }>{recipe[key]}</p>)
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
        <div className="main__page__recipe-container">
          {renderRecipeDetails()}
        </div>
      );
    }
    return null;
  };

  return render();
}
