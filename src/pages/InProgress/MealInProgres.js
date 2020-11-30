import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader';
import '../Detail/detail.css';

export default function MealInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});
  const zero = 0;
  let ingredientsNumber = zero;

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    setRecipes(recipesByIdApi.meals[0]);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= twenty; i += 1) {
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
      <div>
        <SecondaryHeader
          name={ recipes.strMeal }
          img={ recipes.strMealThumb }
          category={ recipes.strCategory }
        />
      </div>
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        <ul>
          {setIngredientAndMeasure().map((ingredient, index) => {
            if (index < ingredientsNumber) {
              return (
                <div>
                  <label>
                    <li>
                      <input
                        type="checkbox"
                        data-testid={ `${index}-ingredient-step` }
                        key={ index }
                      />
                      {`${ingredient.name} - ${ingredient.measure}`}
                    </li>
                  </label>
                  <br />
                </div>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      <div className="button-container">
        <Link to="/receitas-feitas">
          <button
            type="button"
            className="start-recipe"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </div>
  );
}
