import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDrink } from '../../services/cocktailAPI';
import SecondaryHeader from '../../components/SecondaryHeader';
import RecommendationCard from '../../components/RecommendationCard';
import { fetchMeal } from '../../services/mealAPI';
import './detail.css';

function DrinkDetail() {
  const [recipes, setRecipes] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [newRecipe, setNewRecipe] = useState(true);
  const { id } = useParams();
  const zero = 0;
  const two = 2;
  const maxRecommendations = 6;
  let ingredientsNumber = zero;

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchDrink('lookupIngredient', id);
    setRecipes(recipesByIdApi.drinks[0]);
  };

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchMeal('name', '');
    // console.log('recommendation linha 23', recipesRecommendation);
    setRecommendations(recipesRecommendation.meals);
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
      <div className="button-container">
        <Link to={ `/receitas-feitas` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe"
          >
            {newRecipe ? 'Iniciar Receita' : (setNewRecipe(false) && 'Continuar Receita')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DrinkDetail;
