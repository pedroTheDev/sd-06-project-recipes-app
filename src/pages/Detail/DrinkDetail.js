import React, { useState, useEffect } from 'react';
// import Proptypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { fetchDrink } from '../../services/cocktailAPI';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';

function DrinkDetail() {
  const [recipes, setRecipes] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const { id } = useParams();

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchDrink('lookupIngredient', id);
    console.log('recipes', recipesByIdApi);
    setRecipes(recipesByIdApi.drinks[0]);
  };

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchMeal('name', '');
    console.log('recommendation', recipesRecommendation);
    setRecommendations(recipesRecommendation.meals[0]);
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecommendations();
  }, []);

  return (
    <div>
      <SecondaryHeader
        name={ recipes.strDrink }
        img={ recipes.strDrinkThumb }
        category={ recipes.strAlcoholic }
      />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      <div className="container-reccomended">
        <img
          data-testid="${index}-recomendation-card"
          alt="reccomendation"
        />
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div> //
  );
}

export default DrinkDetail;
