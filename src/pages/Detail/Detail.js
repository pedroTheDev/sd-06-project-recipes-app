import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import { fetchDrink } from '../../services/cocktailAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function Detail() {
  const [recipes, setRecipes] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const { id } = useParams();

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    console.log('recipes', recipesByIdApi);
    setRecipes(recipesByIdApi.meals[0]);
  };

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchDrink('name', '');
    console.log('recommendation', recipesRecommendation);
    setRecommendations(recipesRecommendation.drinks[0]);
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecommendations();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    console.log(recipes);
    for (let i = 1; i <= twenty; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipes[0][keyName] !== ('' || null)) {
        const obj = {
          name: recipes[0][keyName],
          measure: recipes[0][measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    return ingredients;
  };

  useEffect(() => {
    setIngredientAndMeasure();
  }, [recipes]);

  if (!recipes) {
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
        <ul>
          {
            setIngredientAndMeasure().map((ingredient, index) => (
              <li key={ index }>{`- ${ingredient.name} - ${ingredient.measure}`}</li>
            ))
          }
        </ul>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      <div className="container-reccomended">
        <img
          data-testid="${index}-recomendation-card"
          alt="recomendation"
        />
      </div>
      <div className="video-container">
        <video data-testid="video" src={ recipes.strYoutube } />
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

export default Detail;
