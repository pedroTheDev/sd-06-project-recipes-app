import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function MealDetail() {
  const [recipes, setRecipes] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const { id } = useParams();
  const zero = 0;
  let ingredientsNumber = zero;

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    console.log('recipes', recipesByIdApi);
    setRecipes(recipesByIdApi.meals[0]);
  };

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchMeal('name', '');
    console.log('recommendation', recipesRecommendation);
    setRecommendations(recipesRecommendation.meals[0]);
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecommendations();
    console.log('recomendations', recommendations);
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
      <div className="container-reccomended">
        <img
          /* data-testid={ `${index}-recomendation-card` } */
          alt="recomendation"
        />
      </div>
      <div className="video-container">
        <video data-testid="video">
          <source src={ recipes.strYoutube } type="video" />
          <track kind="subtitles" />
        </video>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default MealDetail;
