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
  const zero = 0;
  let ingredientsNumber = zero;

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

  const setIngredientAndMeasure = () => {
    const fifteen = 15;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= fifteen; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipes[keyName] !== '' && recipes[keyName] !== null) {
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
        name={ recipes.strDrink }
        img={ recipes.strDrinkThumb }
        category={ recipes.strAlcoholic }
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
          alt="recommendation"
        />
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

export default DrinkDetail;
