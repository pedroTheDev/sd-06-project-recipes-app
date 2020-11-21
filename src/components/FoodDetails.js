import React, { useState, useEffect } from 'react';
import fetchRecipe from '../services/api';

function FoodDetails() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);

  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj.meals);
      setIsFetching(false);
    })();
  }, []);

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const max = 20;
    for (index; index <= max; index += 1) {
      if (recipeData[`strIngredient${index}`] !== null
        && recipeData[`strIngredient${index}`] !== '') {
        ingredientsArray.push({
          ingredient: recipeData[`strIngredient${index}`],
          quantity: recipeData[`strMeasure${index}`],
        });
      }
    }
    return ingredientsArray;
  }

  const data = (isFetching) ? [{}] : recipe;
  const { strMeal,
    strCategory,
    strInstructions,
    strYoutube = '',
    strMealThumb } = data[0];
  const vidUrl = strYoutube.replace(/watch\?v=/g, '/embed/');
  const ingredients = ingredientsFunc(data[0]);

  return (
    <main>
      {(isFetching) ? <div>Loading recipe...</div>
        : (
          <section className="body-recipe">
            <h1 data-testid="recipe-title">
              { strMeal }
            </h1>
            <h3 data-testid="recipe-category">
              { strCategory }
            </h3>
            <img
              data-testid="recipe-photo"
              className="recipe-img"
              src={ strMealThumb }
              alt={ `${strMeal}` }
            />
            <button type="button" data-testid="share-btn">
              Compartilhar
            </button>
            <button type="button" data-testid="favorite-btn">
              Favoritar
            </button>
            <iframe
              data-testid="video"
              src={ vidUrl }
              title={ strMeal }
            />
            <div>
              {ingredients.map((ingredient, index) => (
                <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {`${ingredient.ingredient} - ${(ingredient.quantity === null)
                    ? 'a pinch'
                    : ingredient.quantity}`}
                </p>
              ))}
            </div>
            <p data-testid="instructions">
              {strInstructions}
            </p>
            <button
              type="button"
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
          </section>
        )}
    </main>
  );
}

export default FoodDetails;
