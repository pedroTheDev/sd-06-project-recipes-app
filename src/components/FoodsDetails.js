import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import searchRecipe from '../hooks/searchRecipe';

export default function FoodsDetails(props) {
  const [recipe, recipeId, setRecipeId] = searchRecipe();

  useEffect(() => {
    if (recipeId === '') {
      setRecipeId(props.match.params.id);
    }
  }, [recipeId]);

  function handle(item) {
    return (
      <div>
        <p data-testid="0-ingredient-name-and-measure">{item.strIngredient1}</p>
        <p data-testid="0-ingredient-name-and-measure">{item.strMeasure1}</p>
        <p data-testid="1-ingredient-name-and-measure">{item.strIngredient2}</p>
        <p data-testid="1-ingredient-name-and-measure">{item.strMeasure2}</p>
        <p data-testid="2-ingredient-name-and-measure">{item.strIngredient3}</p>
        <p data-testid="2-ingredient-name-and-measure">{item.strMeasure3}</p>
        <p data-testid="3-ingredient-name-and-measure">{item.strIngredient4}</p>
        <p data-testid="3-ingredient-name-and-measure">{item.strMeasure4}</p>
        <p data-testid="4-ingredient-name-and-measure">{item.strIngredient5}</p>
        <p data-testid="4-ingredient-name-and-measure">{item.strMeasure5}</p>
        <p data-testid="5-ingredient-name-and-measure">{item.strIngredient6}</p>
        <p data-testid="5-ingredient-name-and-measure">{item.strMeasure6}</p>
        <p data-testid="6-ingredient-name-and-measure">{item.strIngredient7}</p>
        <p data-testid="6-ingredient-name-and-measure">{item.strMeasure7}</p>
        <p data-testid="7-ingredient-name-and-measure">{item.strIngredient8}</p>
        <p data-testid="7-ingredient-name-and-measure">{item.strMeasure8}</p>
        <p data-testid="8-ingredient-name-and-measure">{item.strIngredient9}</p>
        <p data-testid="8-ingredient-name-and-measure">{item.strMeasure9}</p>
        <p data-testid="9-ingredient-name-and-measure">{item.strIngredient10}</p>
        <p data-testid="9-ingredient-name-and-measure">{item.strMeasure10}</p>
        <p data-testid="10-ingredient-name-and-measure">{item.strIngredient11}</p>
        <p data-testid="10-ingredient-name-and-measure">{item.strMeasure11}</p>
      </div>
    );
  }

  if (recipe.meals) {
    return (
      <div>
        {recipe.meals.map((item) => (
          <div key={ item }>
            <img
              data-testid="recipe-photo"
              alt="Foto da receita"
              src={ item.strMealThumb }
            />
            <p data-testid="recipe-title">{item.strMeal}</p>
            <input type="button" data-testid="share-btn" value="Share" />
            <input type="button" data-testid="favorite-btn" value="favorite" />
            <p data-testid="recipe-category">{item.strCategory}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            {handle(item)}
            <p data-testid="video">{item.strYoutube}</p>
            <div data-testid="0-recomendation-card"> recomendação</div>
            <input type="button" data-testid="start-recipe-btn" value="Começar receita" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>aló</div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
