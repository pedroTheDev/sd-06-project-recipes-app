import React, { useState, useEffect } from 'react';
// import Proptypes from 'prop-types';
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
    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      const keyName = `strIngredient${i}`;
      if (recipes.meals[0][keyName] !== ('' || null)) {
        ingredients.push(recipes.meals[0][keyName]);
      }
    }

    console.log(ingredients);

    return ingredients;
  };

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
              <li key={ index }>{ingredient}</li>
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
