import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrink from '../services/FetchApiDrink';
import FetchApiFood from '../services/FetchApiFood';

function DrinkDetails() {
  // state que guarda o retorno da requisição
  const {
    drinkDetail,
    setDrinkDetail,
    recomendedFood,
    setRecomendedFood } = useContext(RecipesContext);

  const maxRecomended = 6;

  useEffect(() => {
    // código esperto para pegar somente o id no final da url
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    FetchApiDrink('6', setDrinkDetail, RecipeID);
    FetchApiFood('2', setRecomendedFood, drinkDetail.strMeal);
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
          <div>
            <p>Recomendado:</p>
            {drinkDetail.map((commendedDrink, index3) => (
              <span
                key={ index3 }
                data-testid={ `${index3}-recomendation-card` }
              >
                {commendedDrink.strTags}
              </span>
            ))}

            <p>Comidas Recomendadas:</p>
            {recomendedFood.length >= maxRecomended
              ? recomendedFood.map((recomendation, index4) => (
                <p
                  key={ index4 }
                  data-testid={ `${index4}-recomendation-card` }
                >
                  {recomendation.strMeal}
                </p>
              )).splice(1, maxRecomended) : null}
          </div>
          <button type="button" data-testid="share-btn">
            Botão compartilhar
          </button>
          <button type="button" data-testid="favorite-btn">
            Botão favoritar
          </button>
          <button type="button" data-testid="start-recipe-btn">
            Botão iniciar receita
          </button>
        </div>
      </div>
    ))
  );
}

export default DrinkDetails;
