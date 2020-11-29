import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';
import RecommendationCard from '../../components/RecommendationCard';
import { fetchDrink } from '../../services/cocktailAPI';
import './detail.css';

function MealDetail() {
  const [recipes, setRecipes] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const { id } = useParams();
  const zero = 0;
  const two = 2;
  const maxRecommendations = 6;
  let ingredientsNumber = zero;

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    console.log('recipes linha 16', recipesByIdApi);
    setRecipes(recipesByIdApi.meals[0]);
  };

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchDrink('name', '');
    console.log('recommendations linha 22', recipesRecommendation);
    setRecommendations(recipesRecommendation.drinks);
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecommendations();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= twenty; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipes[keyName] !== ('' && null)) {
        const obj = {
          name: recipes[keyName],
          measure: recipes[measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    ingredientsNumber = i;
    return ingredients;
  };

  useEffect(() => {
    setIngredientAndMeasure();
  }, [recipes]);

  if (Object.keys(recipes).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div>
      <SecondaryHeader
        name={ recipes.strMeal }
        img={ recipes.strMealThumb }
        category={ recipes.strCategory }
      />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        {setIngredientAndMeasure().map((ingredient, index) => {
          if (index < ingredientsNumber) {
            return (
              <div
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`- ${ingredient.name} - ${ingredient.measure}`}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      {

      }
      <div className="video-container">
        <iframe
          data-testid="video"
          src={ recipes.strYoutube }
          title={ recipes.strMeal }
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          id="meal-video"
          frameBorder="0"
          width="300"
          height="300"
        />
      </div>
      <div className="recommendation-container">
        <div className="scroller">
          {
            recommendations.slice(zero, maxRecommendations)
              .map((recommendation, index) => (
                <RecommendationCard
                  className={ index < two ? '' : 'hidden' }
                  key={ index }
                  recommendation={ recommendation }
                  index={ index }
                />
              ))
          }
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default MealDetail;
