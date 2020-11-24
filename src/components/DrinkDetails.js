import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchRecipe2 from '../hooks/searchRecipe2';

import '../css/itemDetails.css';

export default function FoodsDetails(props) {
  const [recipe, recipeId, setRecipeId] = searchRecipe2();
  const [recipeDetails, setRecipeDetails] = useState([]);

  useEffect(() => {
    if (recipeId === '') {
      setRecipeId(props.match.params.id);
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe.drinks) {
      const currRecipe = { ...recipe.drinks[0] };
      const array = [];
      const maxLength = 15;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== null
          || currRecipe[`strIngredient${number}`])
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

  function handle() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      console.log(recipeDetails);
      return (
        <div>
          { recipeDetails.filter((ingredient) => ingredient !== '')
            .map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient[0] }
              >
                { (ingredient[1] === null)
                  ? `${ingredient[0]}`
                  : `${ingredient[0]}: ${(ingredient[1]) && ingredient[1]}` }
              </p>
            )) }
        </div>
      );
    }
  }

  if (recipe.drinks) {
    const item = recipe.drinks[0];
    return (
      <div>
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strDrinkThumb }
            className="item-img"
          />
          <p data-testid="recipe-title">{item.strDrink}</p>
          <input type="button" data-testid="share-btn" value="Share" />
          <input type="button" data-testid="favorite-btn" value="favorite" />
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {handle()}
          <p data-testid="video">{item.strYoutube}</p>
          <div data-testid="0-recomendation-card"> recomendação</div>
          <input type="button" data-testid="start-recipe-btn" value="Começar receita" />
        </div>
      </div>
    );
  }
  return (
    <div>aloudingue</div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
