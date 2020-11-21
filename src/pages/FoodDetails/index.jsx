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

function FoodDetails({ pageType }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    currentFocusedRecipes, loadSingleRecipe, loadingSingleRecipe,
  } = useSingleRecipe();

  const { id } = useParams();

  const {
    cookedRecipes, startCooking, doneRecipes, recipesProgress,
  } = useCook();

  const { favoriteRecipes, updateFavoriteRecipes } = useRecipes();

  useEffect(() => {
    loadSingleRecipe(pageType, id);
  }, [id]);

  const handleShareClick = useCallback(() => {
    document.execCommand('copy', false, id);

    setCopiedLink(true);
  }, [id]);

  const foodDetails = useMemo(
    () => currentFocusedRecipes[pageType].recipe,
    [currentFocusedRecipes],
  );

  const foodRecommendations = useMemo(
    () => currentFocusedRecipes[pageType].recommendations,
    [currentFocusedRecipes],
  );

  const foodIngredients = useMemo(() => {
    const ingredients = (
      Object
        .keys(foodDetails)
        .filter((detail) => {
          const ingredientPattern = /strIngredient\d/i;

          const detailIsIngredient = (
            ingredientPattern.test(detail)
          );

          // makes sure we only have filled ingredients
          if (detailIsIngredient) {
            return foodDetails[detail];
          }

          return false;
        })
        .map((ingredientKey) => {
          const everyNonDigitChar = /[^\d]/g;
          const ingredientNumber = ingredientKey.replace(everyNonDigitChar, '');

          const matchingMeasure = `strMeasure${ingredientNumber}`;

          const ingredient = foodDetails[ingredientKey];
          const measure = foodDetails[matchingMeasure];

          const displayFormat = `${ingredient} - ${measure}`;

          return displayFormat;
        })
    );

    return ingredients;
  }, [foodDetails]);

  const recipeHasBeenStarted = useMemo(() => {
    const accessKey = 'meals';

    const recipeStarted = recipesProgress[accessKey][id];

    return recipeStarted;
  }, [cookedRecipes, id]);

  const recipeHasBeenFinished = useMemo(() => {
    const recipeHasFinished = doneRecipes.find((recipe) => recipe.id === id);

    return recipeHasFinished;
  }, [doneRecipes, id]);

  const handleStartCooking = useCallback(() => {
    startCooking(pageType, foodDetails);
  }, [startCooking, foodDetails]);

  const recipeIsFavorited = useMemo(() => {
    const recipeInFavorites = favoriteRecipes.find((recipe) => recipe.id === id);

    return !!recipeInFavorites;
  }, [id, favoriteRecipes]);

  const handleFavoriteToggle = useCallback(() => {
    const favoriteMeal = {
      id,
      type: pageType,
      area: foodDetails.strArea,
      category: foodDetails.strCategory,
      alcoholicOrNot: false,
      name: foodDetails.strMeal,
      image: foodDetails.strMealThumb,
    };

    updateFavoriteRecipes(favoriteMeal, recipeIsFavorited);
  }, [id, foodDetails, updateFavoriteRecipes, recipeIsFavorited]);

  if (loadingSingleRecipe) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className="recipe-details-page">
      <img
        data-testid="recipe-photo"
        src={foodDetails.strMealThumb}
        alt={foodDetails.strMeal}
      />

      <h2 data-testid="recipe-title">{foodDetails.strMeal}</h2>
      <p data-testid="recipe-category">{foodDetails.strCategory}</p>
      <p>{foodDetails.strArea}</p>

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
        {foodIngredients.map((ingredients, index) => (
          <p
            key={ingredients}
            data-testid={`${index}-ingredient-name-and-measure`}
          >
            {ingredients}

          </p>
        ))}
      </div>

      <div className="video-container">
        <iframe
          width="560"
          height="315"
          data-testid="video"
          title={foodDetails.strMeal}
          src={foodDetails.strYoutube}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div data-testid="instructions" className="recipe-instructions">
        <p>
          {foodDetails.strInstructions}
        </p>
      </div>

      <div className="recommendations-container">
        {foodRecommendations.map((recommendation, index) => (
          <Link
            to={`/bebidas/${recommendation.idDrink}`}
            className="recommendation-card"
            data-testid={`${index}-recomendation-card`}
          >
            <img src={recommendation.strDrinkThumb} alt={recommendation.strDrink} />
            <strong>{recommendation.strDrink}</strong>
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

FoodDetails.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default FoodDetails;
