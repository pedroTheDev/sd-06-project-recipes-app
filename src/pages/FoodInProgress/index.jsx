import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useCook } from '../../hooks/cook';
import { useRecipes } from '../../hooks/recipes';

import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

function FoodInProgress({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    cookedRecipes, recipesProgress, updateRecipeProgress, finalizeRecipe, loadRecipeToCook,
  } = useCook();

  const { id } = useParams();

  const { push } = useHistory();

  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  useEffect(() => {
    const recipeToCook = cookedRecipes[pageType].find(({ recipe }) => (
      recipe.idMeal === id
    ));

    if (!recipeToCook) {
      loadRecipeToCook(pageType, id);
    }
  }, []);

  const handleShareClick = useCallback(() => {
    const url = `http://localhost:3000/${pageType}/${id}`;

    navigator.clipboard.writeText(url);

    setCopiedLink(true);
  }, [id, pageType]);

  const currentlyCooking = useMemo(() => {
    const recipeToCook = cookedRecipes[pageType].find(({ recipe }) => (
      recipe.idMeal === id
    ));

    if (!recipeToCook) {
      return { error: 'Something' };
    }

    return recipeToCook.recipe;
  }, [id, cookedRecipes, pageType]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteMeal = {
      id,
      type: 'comida',
      area: currentlyCooking.strArea || '',
      category: currentlyCooking.strCategory,
      alcoholicOrNot: '',
      name: currentlyCooking.strMeal,
      image: currentlyCooking.strMealThumb,
    };

    updateFavoriteRecipes(favoriteMeal, recipeIsFavorited);
  }, [id, pageType, currentlyCooking, updateFavoriteRecipes, recipeIsFavorited]);

  const foodIngredients = useMemo(() => {
    const ingredients = (
      Object
        .keys(currentlyCooking)
        .filter((detail) => {
          const ingredientPattern = /strIngredient\d/i;

          const detailIsIngredient = (
            ingredientPattern.test(detail)
          );

          // makes sure we only have filled ingredients
          if (detailIsIngredient) {
            return currentlyCooking[detail];
          }

          return false;
        })
        .map((ingredientKey) => {
          const everyNonDigitChar = /[^\d]/g;
          const ingredientNumber = ingredientKey.replace(everyNonDigitChar, '');

          const matchingMeasure = `strMeasure${ingredientNumber}`;

          const ingredient = currentlyCooking[ingredientKey];
          const measure = currentlyCooking[matchingMeasure];

          const displayFormat = `${ingredient} - ${measure}`;

          return displayFormat;
        })
    );

    return ingredients;
  }, [currentlyCooking]);

  const handleIngredientClick = useCallback(({ target }) => {
    const itemIndex = target.value;

    updateRecipeProgress(pageType, id, itemIndex);
  }, [updateRecipeProgress, id, pageType]);

  const currentProgress = useMemo(() => {
    const accessKey = 'meals';

    const progressArray = recipesProgress[accessKey][id];

    if (!progressArray) {
      return [];
    }

    const newProgressArray = [...progressArray];

    return newProgressArray;
  }, [recipesProgress, id]);

  const canFinalizeRecipe = useMemo(() => {
    const everyIngredientChecked = foodIngredients.every(
      (_, index) => currentProgress.includes(`${index}`),
    );

    return everyIngredientChecked;
  }, [foodIngredients, currentProgress]);

  const handleFinalizeRecipe = useCallback(() => {
    finalizeRecipe(pageType, id);

    push('/receitas-feitas');
  }, [id, finalizeRecipe, pageType, push]);

  if (currentlyCooking.error) {
    return (
      <div className="recipe-dint-start">
        <p>{currentlyCooking.error}</p>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={currentlyCooking.strMealThumb}
        alt={currentlyCooking.strMeal}
      />

      <h2 data-testid="recipe-title">{currentlyCooking.strMeal}</h2>
      <p data-testid="recipe-category">{currentlyCooking.strCategory}</p>
      <p>{currentlyCooking.strArea}</p>

      <div className="share-btn-container">
        <button
          onClick={handleShareClick}
          type="button"
        >
          <img
            data-testid="share-btn"
            src={shareIcon}
            alt="share this recipe"
          />
        </button>

        {copiedLink && (
          <span>Link copiado!</span>
        )}
      </div>

      <div className="favorites-btn-container">
        <button type="button" onClick={handleFavoriteToggle}>
          <img data-testid="favorite-btn" src={recipeIsFavorited ? blackHeart : whiteHeart} alt="favorite this recipe" />
        </button>
      </div>

      <div className="recipe-ingredients in-progress-ingredients">
        {foodIngredients.map((ingredient, index) => (
          <div
            className="ingredients-checkbox-container"
            key={ingredient}
          >

            <label
              key={ingredient}
              data-testid={`${index}-ingredient-step`}
              htmlFor={ingredient}
              className={currentProgress.includes(`${index}`) ? 'item-checked' : ''}
            >
              <input
                type="checkbox"
                name={ingredient}
                id={ingredient}
                value={index}
                checked={currentProgress.includes(`${index}`)}
                onChange={handleIngredientClick}
              />

              {ingredient}

            </label>
          </div>
        ))}
      </div>

      <div data-testid="instructions" className="recipe-instructions">
        <p>
          {currentlyCooking.strInstructions}
        </p>
      </div>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={!canFinalizeRecipe}
        onClick={handleFinalizeRecipe}
      >
        Finalizar Receita
      </button>

    </div>
  );
}

FoodInProgress.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default FoodInProgress;
