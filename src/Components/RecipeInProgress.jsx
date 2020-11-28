import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../hooks/RecipeContext';
import recipeRequest from '../services/recipeRequest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const kindof = pathname.split('/')[1];
  const [recipeDetailDrink, setRecipeDetailDrink] = useState([]);
  const [recipeDetailFood, setRecipeDetailFood] = useState([]);
  const [copied, setCopied] = useState('');
  const [disable, setDisable] = useState(true);
  const {
    handleLikes,
    liked,
    setLiked,
  } = useContext(RecipeContext);
  const NINE = 9;
  const TWENTY_NINE = 29;
  const FOURTY_NINE = 49;

  const THIRTY_SIX = 36;
  const TWENTY_ONE = 21;
  const FIFTY_ONE = 51;

  const handleStartTasks = () => {
    const items = document.getElementsByClassName('checks');
    const arr = Array.from(items);
    if (kindof === 'comidas') {
      const tasks = JSON.parse(localStorage.inProgressRecipes).meals[id]
        .map((item) => arr.filter((itens) => itens.id === item)[0]);
      tasks.forEach((el) => {
        el.checked = true;
      });
    } else {
      console.log('indo');
      const tasks = JSON.parse(localStorage.inProgressRecipes).cocktails[id]
        .map((item) => arr.filter((itens) => itens.id === item)[0]);
      tasks.forEach((el) => {
        el.checked = true;
      });
    }
  };

  const getAPI = async () => {
    const food = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeFood = await food.meals;
    const drink = await recipeRequest(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipeDrink = await drink.drinks;
    setRecipeDetailDrink(recipeDrink);
    setRecipeDetailFood(recipeFood);
    if (JSON.parse(localStorage.inProgressRecipes).meals[id]) {
      handleStartTasks();
    } else if (JSON.parse(localStorage.inProgressRecipes).cocktails[id]) {
      handleStartTasks();
    }
  };

  const handleStorageProgress = () => {
    if (kindof === 'comidas') {
      if (!localStorage.inProgressRecipes) {
        localStorage.inProgressRecipes = JSON.stringify({
          cocktails: {}, meals: { [id]: [] } });
      } else if (JSON.parse(localStorage.inProgressRecipes).meals[id]) {
        // const reset = JSON.parse(localStorage.inProgressRecipes = )
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals },
          },
        );
      } else {
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes).meals, [id]: [] },
          },
        );
      }
    } else if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify({
        cocktails: { [id]: [] }, meals: {} });
    } else if (JSON.parse(localStorage.inProgressRecipes).cocktails[id]) {
      // const reset = JSON.parse(localStorage.inProgressRecipes = )
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes).cocktails },
        },
      );
    } else {
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: [] },
        },
      );
    }
  };

  useEffect(() => {
    getAPI();
    if (!localStorage.doneRecipes) {
      localStorage.doneRecipes = JSON.stringify([]);
    }
    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify([]);
    }
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((item) => item.id === id);
    if (favoriteStorage.length >= 1) {
      setLiked(blackHeartIcon);
    } else {
      setLiked(whiteHeartIcon);
    }
    handleStorageProgress();
  }, []);

  const handleCheckbox = ({ target }) => {
    const items = document.getElementsByClassName('checks');
    const arr = Array.from(items);
    if (arr.every((item) => item.checked === true)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (kindof === 'comidas') {
      if (target.checked) {
        const concatenando = JSON.parse(localStorage.inProgressRecipes);
        const newObj = concatenando.meals[id].concat(target.id);
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes)
              .meals,
            [id]: newObj } },
        );
      } else {
        const concatenando = JSON.parse(localStorage.inProgressRecipes);
        const newObj = concatenando.meals[id].filter((meal) => meal !== target.id);
        localStorage.inProgressRecipes = JSON.stringify(
          { ...JSON.parse(localStorage.inProgressRecipes),
            meals: { ...JSON.parse(localStorage.inProgressRecipes)
              .meals,
            [id]: newObj } },
        );
      }
    } else if (target.checked) {
      const concatenando = JSON.parse(localStorage.inProgressRecipes);
      const newObj = concatenando.cocktails[id].concat(target.id);
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: newObj } },
      );
    } else {
      const concatenando = JSON.parse(localStorage.inProgressRecipes);
      const newObj = concatenando.cocktails[id].filter((meal) => meal !== target.id);
      localStorage.inProgressRecipes = JSON.stringify(
        { ...JSON.parse(localStorage.inProgressRecipes),
          cocktails: { ...JSON.parse(localStorage.inProgressRecipes)
            .cocktails,
          [id]: newObj } },
      );
    }
  };

  const handleIngredients = (recipe, initial, middle, end) => {
    const ingredients = Object.values(recipe).slice(initial, middle);
    const measures = Object.values(recipe).slice(middle, end);
    return ingredients
      .filter((recipes) => recipes !== null && recipes !== '')
      .map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ ingredient }>
            <input
              className="checks"
              type="checkbox"
              id={ ingredient }
              onChange={ handleCheckbox }
            />
            { `${ingredient} - ${measures[index]}` }
          </label>
        </div>
      ));
  };

  const handleFinishRecipe = () => {
    const typeRecipe = pathname.split('/')[1];
    if (typeRecipe === 'comidas') {
      const doneFood = {
        id: recipeDetailFood[0].idMeal,
        type: 'comida',
        area: recipeDetailFood[0].strArea,
        category: recipeDetailFood[0].strCategory,
        alcoholicOrNot: '',
        name: recipeDetailFood[0].strMeal,
        image: recipeDetailFood[0].strMealThumb,
        doneDate: '',
        tags: recipeDetailFood[0].strTags,
      };
      const itens = JSON.parse(localStorage.doneRecipes);
      const AllFavorites = itens.concat(doneFood);
      localStorage.doneRecipes = JSON.stringify(AllFavorites);
    } else {
      const doneFood = {
        id: recipeDetailDrink[0].idDrink,
        type: 'bebida',
        area: '',
        category: recipeDetailDrink[0].strCategory,
        alcoholicOrNot: recipeDetailDrink[0].strAlcoholic,
        name: recipeDetailDrink[0].strDrink,
        image: recipeDetailDrink[0].strDrinkThumb,
        doneDate: '',
        tags: recipeDetailDrink[0].strTags,
      };
      const itens = JSON.parse(localStorage.doneRecipes);
      const AllFavorites = itens.concat(doneFood);
      localStorage.doneRecipes = JSON.stringify(AllFavorites);
    }
  };

  const handleCopy = () => {
    const urls = window.location.href.split('/');
    const fullUrl = `${urls[0]}//${urls[2]}/${urls[3]}/${urls[4]}`;
    copy(fullUrl);
    const TWO = 2000;
    setCopied('Link copiado!');
    setInterval(() => setCopied(''), TWO);
  };

  if (pathname === `/comidas/${id}/in-progress`) {
    return recipeDetailFood.map((food) => (
      <div key="1">
        <img
          alt="product"
          data-testid="recipe-photo"
          src={ food.strMealThumb }
        />
        <h1 data-testid="recipe-title">{ food.strMeal }</h1>
        <button
          onClick={ handleCopy }
          type="button"
          data-testid="share-btn"
        >
          Share

        </button>

        {copied}
        <button
          onClick={ () => handleLikes(recipeDetailFood[0]) }
          type="button"
        >
          <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
        </button>
        <p data-testid="recipe-category">{ food.strCategory }</p>
        {
          handleIngredients(food, NINE, TWENTY_NINE, FOURTY_NINE)
        }
        <p data-testid="instructions">{ food.strInstructions }</p>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ disable }
          >
            Finalizar
          </button>
        </Link>
      </div>
    ));
  }
  return recipeDetailDrink.map((drink) => (
    <div key="2">
      <img
        alt="product"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <button
        onClick={ handleCopy }
        type="button"
        data-testid="share-btn"
      >
        Share

      </button>

      {copied}
      <button
        onClick={ () => handleLikes(recipeDetailFood, recipeDetailDrink[0]) }
        type="button"
      >
        <img data-testid="favorite-btn" src={ liked } alt="favorite logo" />
      </button>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      {
        handleIngredients(drink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)
      }
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ handleFinishRecipe }
        >
          Finalizar
        </button>
      </Link>
    </div>
  ));
};

export default RecipeInProgress;
