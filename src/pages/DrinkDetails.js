import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrink from '../services/FetchApiDrink';
import FetchApiFood from '../services/FetchApiFood';

import '../App.css';

function DrinkDetails() {
  // state que guarda o retorno da requisição
  const {
    drinkDetail,
    setDrinkDetail,
    recomendedFood,
    setRecomendedFood,
    recipeState,
    setRecipeState } = useContext(RecipesContext);

  const maxRecomended = 6;
  const minRecomended = 0;

  useEffect(() => {
    // código esperto para pegar somente o id no final da url
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    FetchApiDrink('6', setDrinkDetail, RecipeID);
    FetchApiFood('2', setRecomendedFood, drinkDetail.strMeal);
    console.log(recomendedFood);
  }, []);

  function renderIngredients() {
    const ingredientArray = [];
    const vinte = 20;

    for (let i = 1; i <= vinte; i += 1) {
      if (drinkDetail[0][`strIngredient${i}`] === ''
      || drinkDetail[0][`strIngredient${i}`] === null) {
        break;
      }

      ingredientArray.push({
        ingredientes: drinkDetail[0][`strIngredient${i}`],
        medidas: drinkDetail[0][`strMeasure${i}`] });
    }

    return ingredientArray.map((ingredient, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`Ingredient: ${ingredient.ingredientes} Measure: ${ingredient.medidas}`}
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

    window.location.pathname = `/bebidas/${RecipeID}/in-progress`;
  }

  return (
    drinkDetail.map((drink, index) => (
      <div key={ index }>
        <div>
          <div>
            <p data-testid="recipe-title">{drink.strDrink}</p>
            <p data-testid="recipe-category">{drink.strCategory}</p>
            { drink.strAlcoholic !== drink.strAlcoholic.includes('Alcoholic')
              ? <span data-testid="recipe-category">Alcoholic: yes</span>
              : <span data-testid="recipe-category">Alcoholic: no</span>}
          </div>
          <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />
          <div>
            <p data-testid="instructions">{drink.strInstructions}</p>
          </div>
          <div>
            <iframe
              title="youtube-video"
              width="300"
              height="300"
              data-testid="video"
              src={ drink.strVideo }
            />
          </div>
          <div>
            {drinkDetail.length === 1 ? renderIngredients() : null}
          </div>

          <div>Recomendadas: </div>

          <div className="carousel scroller">
            <span className="btn prev">&lt;</span>
            <span className="btn next">&gt;</span>
            {recomendedFood.length >= maxRecomended
              ? recomendedFood.map((recomendation, index4) => (
                <div key={ index4 }>
                  <span
                    className="carousel-item"
                    data-testid={ `${index4}-recomendation-card` }
                  >
                    <div>
                      <img src={ recomendation.strMealThumb } alt="drink" />
                    </div>
                    <div
                      className="card"
                      data-testid={ `${index4}-recomendation-title` }
                    >
                      {recomendation.strMeal}
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

export default DrinkDetails;
