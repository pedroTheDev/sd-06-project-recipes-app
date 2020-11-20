import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSingleRecipe } from '../../hooks/singleRecipe';
import { useCook } from '../../hooks/cook';
import { useRecipes } from '../../hooks/recipes';

import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

function DrinkDetails({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const { currentFocusedRecipes, loadSingleRecipe, loadingSingleRecipe } = useSingleRecipe();
  const { id } = useParams();
  const { cookedRecipes, startCooking } = useCook();
  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  useEffect(() => {
    loadSingleRecipe(pageType, id);
  }, [id]);

  const handleShareClick = useCallback(() => {
    document.execCommand('copy');

    setCopiedLink(true);
  }, []);

  const drinkDetails = useMemo(
    () => currentFocusedRecipes[pageType].recipe,
    [currentFocusedRecipes],
  );

  const drinkRecommendations = useMemo(
    () => currentFocusedRecipes[pageType].recommendations,
    [currentFocusedRecipes],
  );

  const drinkIngredients = useMemo(() => {
    const ingredients = (
      Object
        .keys(drinkDetails)
        .filter((detail) => {
          const ingredientPattern = /strIngredient\d/i;

          const detailIsIngredient = (
            ingredientPattern.test(detail)
          );

          // makes sure we only have filled ingredients
          if (detailIsIngredient) {
            return drinkDetails[detail];
          }

          return false;
        })
        .map((ingredientKey) => {
          const everyNonDigitChar = /[^\d]/g;
          const ingredientNumber = ingredientKey.replace(everyNonDigitChar, '');

          const matchingMeasure = `strMeasure${ingredientNumber}`;

          const ingredient = drinkDetails[ingredientKey];
          const measure = drinkDetails[matchingMeasure];

          const displayFormat = `${ingredient} - ${measure}`;

          return displayFormat;
        })
    );

    return ingredients;
  }, [drinkDetails]);

  const recipeHasBeenStarted = useMemo(() => {
    const recipeStarted = cookedRecipes[pageType].find((recipe) => (
      recipe.recipe.idDrink === id
    ));

    return recipeStarted;
  }, [cookedRecipes, id]);

  const recipeHasBeenFinished = useMemo(() => {
    if (recipeHasBeenStarted) {
      return recipeHasBeenStarted.finished;
    }

    return null;
  }, [recipeHasBeenStarted]);

  const handleStartCooking = useCallback(() => {
    startCooking(pageType, drinkDetails);
  }, [startCooking, drinkDetails]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteMeal = {
      id,
      type: pageType,
      area: null,
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
    };

    updateFavoriteRecipes(favoriteMeal, recipeIsFavorited);
  }, [id, drinkDetails, updateFavoriteRecipes, recipeIsFavorited]);

  if (loadingSingleRecipe) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={drinkDetails.strDrinkThumb}
        alt={drinkDetails.strDrink}
      />

      <h2 data-testid="recipe-title">{drinkDetails.strDrink}</h2>
      <p data-testid="recipe-category">{drinkDetails.strCategory}</p>

      <div className="share-btn-container">
        <button
          data-testid="share-btn"
          onClick={handleShareClick}
          type="button"
        >
          <img src={shareIcon} alt="share this recipe" />
        </button>

        {copiedLink && (
          <span>Link copiado!</span>
        )}
      </div>

      <div className="favorites-btn-container">
        <button data-testid="favorite-btn" type="button" onClick={handleFavoriteToggle}>
          <img src={recipeIsFavorited ? blackHeart : whiteHeart} alt="favorite this recipe" />
        </button>
      </div>

      <div className="recipe-ingredients">
        {drinkIngredients.map((ingredients, index) => (
          <p
            key={ingredients}
            data-testid={`${index}-ingredient-name-and-measure`}
          >
            {ingredients}

          </p>
        ))}
      </div>

      <div data-testid="instructions" className="recipe-instructions">
        <p>
          {drinkDetails.strInstructions}
        </p>
      </div>

      <div className="recommendations-container">
        {drinkRecommendations.map((recommendation, index) => (
          <Link
            to={`/bebidas/${recommendation.idMeal}`}
            className="recommendation-card"
            data-testid={`${index}-recomendation-card`}
          >
            <img src={recommendation.strMealThumb} alt={recommendation.strMeal} />
            <strong>{recommendation.strMeal}</strong>
          </Link>
        ))}
      </div>

      {!recipeHasBeenFinished && (
        <Link
          to={`/${pageType}/${id}/in-progress`}
          data-testid="start-recipe-btn"
          onClick={handleStartCooking}
        >
          {recipeHasBeenStarted ? 'Continuar Receita' : 'Iniciar Receita'}
        </Link>
      )}

    </div>
  );
}

DrinkDetails.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default DrinkDetails;
