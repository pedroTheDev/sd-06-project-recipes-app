import React, { useMemo, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useCook } from '../../hooks/cook';
import { useRecipes } from '../../hooks/recipes';

import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

function DrinkInProgress({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    cookedRecipes, recipesProgress, updateRecipeProgress, finalizeRecipe,
  } = useCook();

  const { id } = useParams();

  const { push } = useHistory();

  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  const handleShareClick = useCallback(() => {
    document.execCommand('copy', false, id);

    setCopiedLink(true);
  }, [id]);

  const currentlyCooking = useMemo(() => {
    const recipeToCook = cookedRecipes[pageType].find(({ recipe }) => (
      recipe.idDrink === id
    ));

    return recipeToCook.recipe;
  }, [id, cookedRecipes, pageType]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteMeal = {
      id,
      type: pageType,
      area: currentlyCooking.strArea || '',
      category: currentlyCooking.strCategory,
      alcoholicOrNot: currentlyCooking.strAlcoholic,
      name: currentlyCooking.strDrink,
      image: currentlyCooking.strDrinkThumb,
    };

    updateFavoriteRecipes(favoriteMeal, recipeIsFavorited);
  }, [id, currentlyCooking, updateFavoriteRecipes, recipeIsFavorited]);

  const drinkIngredients = useMemo(() => {
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
  }, [updateRecipeProgress, id]);

  const currentProgress = useMemo(() => {
    const accessKey = 'cocktails';

    const progressArray = recipesProgress[accessKey][id];

    if (!progressArray) {
      return [];
    }

    const newProgressArray = [...progressArray];

    return newProgressArray;
  }, [recipesProgress, id]);

  const canFinalizeRecipe = useMemo(() => {
    const everythingChecked = drinkIngredients.every((_, index) => (
      currentProgress.includes(`${index}`)
    ));

    return everythingChecked;
  }, [currentProgress, drinkIngredients]);

  const handleFinalizeRecipe = useCallback(() => {
    finalizeRecipe(pageType, id);

    push('/receitas-feitas');
  }, [id, finalizeRecipe]);

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={currentlyCooking.strDrinkThumb}
        alt={currentlyCooking.strDrink}
      />

      <h2 data-testid="recipe-title">{currentlyCooking.strDrink}</h2>
      <p data-testid="recipe-category">{currentlyCooking.strCategory}</p>
      <p>{currentlyCooking.strAlcoholic}</p>

      <div className="share-btn-container">
        <button
          data-testid="share-btn"
          onClick={handleShareClick}
          type="button"
        >
          <img src={shareIcon} alt="share this recipe" />
        </button>

        {copiedLink && (
          <span className="copied-item">Link copiado!</span>
        )}
      </div>

      <div className="favorites-btn-container">
        <button data-testid="favorite-btn" type="button" onClick={handleFavoriteToggle}>
          <img src={recipeIsFavorited ? blackHeart : whiteHeart} alt="favorite this recipe" />
        </button>
      </div>

      <div className="recipe-ingredients in-progress-ingredients">
        {drinkIngredients.map((ingredient, index) => (
          <div
            key={ingredient}
            className="ingredients-checkbox-container"
          >
            <input
              type="checkbox"
              name={ingredient}
              id={ingredient}
              value={index}
              checked={currentProgress.includes(`${index}`)}
              onChange={handleIngredientClick}
            />

            <label
              key={ingredient}
              data-testid={`${index}-ingredient-step`}
              htmlFor={ingredient}
              className={currentProgress.includes(`${index}`) ? 'item-checked' : ''}
            >
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

DrinkInProgress.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default DrinkInProgress;
