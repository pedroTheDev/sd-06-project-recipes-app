import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiFood from '../services/FetchApiFood';
import FetchApiDrink from '../services/FetchApiDrink';

import '../App.css';

function FoodDetails() {
  // state que guarda o retorno da requisição
  const {
    foodDetail,
    setFoodDetail,
    recomendedDrink,
    setRecomendedDrink,
    recipeState,
    setRecipeState } = useContext(RecipesContext);

  const maxRecomended = 6;
  const minRecomended = 0;

  useEffect(() => {
    // código esperto para pegar somente o id no final da url
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    FetchApiFood('6', setFoodDetail, RecipeID);
    FetchApiDrink('2', setRecomendedDrink, foodDetail.strMeal);
  }, []);

  function renderIngredients() {
    const ingredientArray = [];
    const vinte = 20;
    for (let i = 1; i <= vinte; i += 1) {
      if (foodDetail[0][`strIngredient${i}`] === '') {
        break;
      }
      ingredientArray.push({
        ingredientes: foodDetail[0][`strIngredient${i}`],
        medidas: foodDetail[0][`strMeasure${i}`] });
    }

    return ingredientArray.map((ingredient, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`Ingredient: ${ingredient.ingredientes} Measure: ${ingredient.medidas}`}
        {}
      </p>
    ));
  }

  // O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
  // O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";

  // Essa função gerencia o estado da receita
  function handleRecipeState() {
    setRecipeState({ ...recipeState, ReceitaIniciada: true });
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);

    window.location.pathname = `/comidas/${RecipeID}/in-progress`;
    console.log(RecipeID);
  }

  return (
    foodDetail.map((food, index) => (
      <div key={ index }>
        <div>
          <div>
            <p data-testid="recipe-title">{food.strMeal}</p>
            {food.Cateogry !== 'Vegetarian'
              ? <span data-testid="recipe-category">Vegetarian: no</span>
              : <span data-testid="recipe-category">Vegetarian: yes</span>}
          </div>
          <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
          <div>
            <p data-testid="instructions">{food.strInstructions}</p>
          </div>
          <div>
            <iframe
              title="youtube-video"
              width="300"
              height="300"
              data-testid="video"
              src={ food.strYoutube }
            />
          </div>

          <div>
            {foodDetail.length === 1 ? renderIngredients() : null}
          </div>

          <div>Recomendadas: </div>

          <div className="carousel scroller">
            <span className="btn prev">&lt;</span>
            <span className="btn next">&gt;</span>
            {recomendedDrink.length >= maxRecomended
              ? recomendedDrink.map((recomendation, index4) => (
                <div key={ index4 }>
                  <span
                    className="carousel-item"
                    data-testid={ `${index4}-recomendation-card` }
                  >
                    <div>
                      <img src={ recomendation.strDrinkThumb } alt="drink" />
                    </div>
                    <div
                      className="card"
                      data-testid={ `${index4}-recomendation-title` }
                    >
                      {recomendation.strDrink}
                    </div>
                  </span>
                </div>
              )).slice(minRecomended, maxRecomended) : null}
          </div>

          <button
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-btn"
            onClick={ handleRecipeState }
          >
            {recipeState.ReceitaIniciada ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>

          <button type="button" data-testid="share-btn">
            Botão compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Botão favoritar
          </button>
        </div>
      </div>
    ))
  );
}

export default FoodDetails;
