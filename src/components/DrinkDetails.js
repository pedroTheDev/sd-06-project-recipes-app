import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import { getRecipesMealsApi } from '../services/mealsAPI';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import MyCarousel from './MyCarousel';
import MealsContext from '../context/MealsContext';
import '../Css/MealDetail.css';

function DrinkDetails() {
  const [recipeDrink, setRecipeDrink] = useState(
    { recipe: {}, btnDone: '' },
  );

  const { recommendedRecipe, setRecommendedRecipe } = useContext(MealsContext);
  const itemZerado = 0;

  const { id } = useParams(); // retorna o paramentro que está na rota

  useEffect(() => {
    async function fetchDatas() {
      const inicio = 0;
      const fim = 6;

      // Verifica se receita já foi iniciada ou concluída
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const indexDoneRecipe = doneRecipes.findIndex((item) => item.id === id);
      let textBtnDoneRecipe = 'Iniciar Receita';
      if (indexDoneRecipe >= inicio) {
        if (doneRecipes[indexDoneRecipe].doneDate === '') {
          textBtnDoneRecipe = 'Continuar Receita';
        } else {
          textBtnDoneRecipe = 'Receita Finalizada';
        }
      }

      // Verifica os detalhes da receita por id para
      const resultDetail = await getRecipeDrinkByIdApi(id);
      setRecipeDrink(resultDetail[0]);

      // Verifica receitas recomendadas
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

  function updateDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const newDoneRecipe = {
      id: recipeDrink.idDrink,
      type: 'bebida',
      area: '',
      category: recipeDrink.strCategory,
      alcoholicOrNot: recipeDrink.strAlcoholic,
      name: recipeDrink.strDrink,
      image: recipeDrink.strDrinkThumb,
      doneDate: '',
      tags: recipeDrink.strTags,
    };
    const arrayDoneRecipe = [...doneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipe));
  }

  function imgDetail() {
    return (
      <div className="img-container">
        <img
          className="detail-img"
          alt="detail"
          data-testid="recipe-photo"
          src={ recipeDrink.strDrinkThumb }
        />
      </div>
    );
  }
  function titleDatail() {
    return (
      <div>
        <h2 data-testid="recipe-title">{ recipeDrink.strDrink }</h2>
        <div>
          <img src={ shareIcon } alt="Profile" data-testid="share-btn" />
          <img src={ favoriteIcon } alt="Profile" data-testid="favorite-btn" />
        </div>
      </div>
    );
  }

  function categoryDetail() {
    return (
      <div>
        <h4 data-testid="recipe-category">{ recipeDrink.strAlcoholic }</h4>
      </div>
    );
  }

  function ingredientsDetail() {
    return (
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
    );
  }

  function instructionsDetail() {
    return (
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipeDrink.strInstructions }</p>
      </div>
    );
  }

  function recommendedDetail() {
    return (
      <div>
        <h3>Recommended</h3>
        { recommendedRecipe.length !== itemZerado
          ? <MyCarousel />
          : <p>Loading...</p> }
      </div>
    );
  }

  function buttonDetail() {
    return (
      <div>
        { recipeDrink.btnDone === 'Receita Finalizada'
          ? (<h5>{ recipeDrink.btnDone }</h5>)
          : (
            <Button
              className="btn-iniciar-receita"
              type="button"
              data-testid="start-recipe-btn"
              variant="success"
              size="lg"
              block
              onClick={ updateDoneRecipes }
            >
              { recipeDrink.btnDone }
            </Button>)}
      </div>
    );
  }

  return (
    <div>
      {/* { btnDoneRecipe === ''
        ? (<h5>Loading...</h5>)
        : ( */}
      <div>
        { imgDetail() }
        { titleDatail() }
        { categoryDetail() }
        { ingredientsDetail() }
        { instructionsDetail() }
        { recommendedDetail() }
        { buttonDetail() }
      </div>
      {/* )} */}
    </div>
  );
}

export default DrinkDetails;
