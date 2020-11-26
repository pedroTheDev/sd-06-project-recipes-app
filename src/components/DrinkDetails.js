import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import { getRecipesMealsApi } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MyCarousel from './MyCarousel';
import MealsContext from '../context/MealsContext';

function DrinkDetails() {
  const [recipeDrink, setRecipeDrink] = useState({});
  const { recommendedRecipe, setRecommendedRecipe } = useContext(MealsContext);
  const itemZerado = 0;

  const { id } = useParams(); // retorna o paramentro que está na rota

  useEffect(() => {
    async function fetchDatas() {
      const resultDetail = await getRecipeDrinkByIdApi(id);
      setRecipeDrink(resultDetail[0]);

      const inicio = 0;
      const fim = 6;
      const resultMeals = await getRecipesMealsApi();
      const myMeals = resultMeals.slice(inicio, fim);
      const myRecommendedMeals = myMeals.map((item) => {
        const myCard = {
          id: item.idMeal,
          strName: item.strMeal,
          strThumb: item.strMealThumb,
          strCategory: item.strCategory,
        };
        return myCard; // retorna o novo objeto criado no map do myCards
      });
      setRecommendedRecipe(myRecommendedMeals);
    }
    fetchDatas();
  }, []);

  function getIngredients() {
    const inicio = 1;
    const fim = 15;
    let ingredients = [];
    for (let i = inicio; i <= fim; i += 1) {
      if (recipeDrink[`strIngredient${i}`] !== null) {
        ingredients = [...ingredients,
          { ingredient: recipeDrink[`strIngredient${i}`],
            measure: recipeDrink[`strMeasure${i}`] }];
      }
    }
    return ingredients;
  }

  return (
    <div>
      <div className="img-container">
        <img
          className="detail-img"
          alt="detail"
          data-testid="recipe-photo"
          src={ recipeDrink.strDrinkThumb }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ recipeDrink.strDrink }</h2>
        <div>
          <img src={ shareIcon } alt="Profile" data-testid="share-btn" />
          <img src={ favoriteIcon } alt="Profile" data-testid="favorite-btn" />
        </div>
      </div>
      <div>
        <h4 data-testid="recipe-category">{ recipeDrink.strCategory }</h4>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `- ${item.ingredient} (${item.measure})` }
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipeDrink.strInstructions }</p>
      </div>
      <div>
        <h3>Recommended</h3>
        { recommendedRecipe.length !== itemZerado
          ? <MyCarousel />
          : <p>Loading...</p> }
      </div>
      <div>
        <Button
          type="button"
          data-testid="start-recipe-btn"
          variant="warning"
          size="lg"
          block
        >
          Iniciar Receita
        </Button>
      </div>
    </div>
  );
}

export default DrinkDetails;
