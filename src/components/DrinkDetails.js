import React, { useState, useEffect } from 'react';
import fetchRecipe from '../services/api';

function DrinkDetails() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj.drinks);
      setIsFetching(false);
    })();
  }, []);

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const max = 15;
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
  const { strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb } = data[0];
  const ingredients = ingredientsFunc(data[0]);

  return (
    <main>
      {(isFetching) ? <div>Loading recipe...</div>
        : (
          <section className="body-recipe">
            <h1 data-testid="recipe-title">
              {strDrink}
            </h1>
            <h3 data-testid="recipe-category">
              {strCategory}
            </h3>
            <img
              data-testid="recipe-photo"
              className="recipe-img"
              src={ strDrinkThumb }
              alt={ `${strDrink}` }
            />
            <button type="button" data-testid="share-btn">
              Compartilhar
            </button>
            <button type="button" data-testid="favorite-btn">
              Favoritar
            </button>
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

export default DrinkDetails;
