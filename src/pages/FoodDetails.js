import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiFood from '../services/FetchApiFood';

function FoodDetails() {
  // state que guarda o retorno da requisição
  const { foodDetail, setFoodDetail } = useContext(RecipesContext);

  useEffect(() => {
    // código esperto para pegar somente o id no final da url
    const location = window.location.pathname;
    const magickNumber = 9;
    const RecipeID = location.slice(magickNumber, location.length);
    FetchApiFood('6', setFoodDetail, RecipeID);
  }, []);

  // Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
  // O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";

  // O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
  // O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";

  return (
    foodDetail.map((food, index) => (
      <div key={ index }>
        <div>
          <div>
            <p data-testid="recipe-title">{food.strMeal}</p>
            <span data-testid="recipe-category">{food.Category}</span>
          </div>
          <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
          <div>
            <p data-testid="recipe-instructions">{food.strInstructions}</p>
          </div>
          <div>
            <iframe
              title="youtube-video"
              width="300"
              height="300"
              data-testid="video"
              src={ food.strYoutube }
            />
            <ul>
              {food.strIngredient.map((foodIngredient, indice) => (
                <div key={ indice }>{foodIngredient}</div>
              ))}
            </ul>
          </div>

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
