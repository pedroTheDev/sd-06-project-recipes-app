import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipesInProgress() {
  const location = useLocation().pathname;
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [isFetching, setFetching] = useState(true);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  let allCheckedIngredients = [];
  if (localStorage.getItem('checkedIngredients')) {
    allCheckedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
  }
  const localStorageFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const allDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();

  const fetchRecipesInProgress = async () => {
    const splitUrl = location.split('/');
    const id = splitUrl[2];
    if (location.includes('comidas')) {
      const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.meals[0]);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === apiResponse.meals[0].idMeal) {
            setFavoriteRecipe(true);
          }
        });
      }
    } else {
      const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const apiResponse = await apiRequest.json();
      setRecipeInProgress(apiResponse.drinks[0]);
      if (localStorageFavs) {
        localStorageFavs.forEach((item) => {
          if (item.id === apiResponse.drinks[0].idDrink) {
            setFavoriteRecipe(true);
          }
        });
      }
    }
  };

  const renderLoading = () => <h1>Loading...</h1>;

  useEffect(() => {
    setFetching(true);
    fetchRecipesInProgress();
    setFetching(false);
  }, []);

  const handleClick = () => {
    const zero = 0;
    const ten = 10;
    const newDoneRecipe = {
      id: recipeInProgress.idMeal,
      type: 'comida',
      area: recipeInProgress.strArea,
      category: recipeInProgress.strCategory,
      alcoholicOrNot: '',
      name: recipeInProgress.strMeal,
      image: recipeInProgress.strMealThumb,
      doneDate: new Date().toJSON().slice(zero, ten).replace(/-/g, '-'),
      tags: recipeInProgress.strTags ? recipeInProgress.strTags : '',
    };

    if (!allDoneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
    } else {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...allDoneRecipes, newDoneRecipe]));
    }
    history.push('/receitas-feitas');
  };

  const handleIngredients = (index) => {
    const ingredientMade = document.getElementById(`${index}-ingredient`);

    if (ingredientMade.style.cssText === 'text-decoration: line-through;') {
      ingredientMade.style = 'text-decoration: none';
      allCheckedIngredients.forEach((ingredient, i) => {
        if (ingredient === ingredientMade.innerHTML) {
          allCheckedIngredients.splice(i, 1);
          localStorage.setItem('checkedIngredients',
            JSON.stringify(allCheckedIngredients));
        }
      });
    } else {
      ingredientMade.style = 'text-decoration: line-through';
      allCheckedIngredients.push(ingredientMade.innerHTML);
      localStorage.setItem('checkedIngredients', JSON.stringify(allCheckedIngredients));
    }
    const allCheckBoxs = document.querySelectorAll('#checkbox');
    let isChecked = false;
    allCheckBoxs.forEach((checkbox) => {
      if (checkbox.checked === true) {
        isChecked = true;
      } else {
        isChecked = false;
      }
    });
    if (isChecked) {
      setDisabled(false);
    }
  };

  const renderIngredients = (recipeData) => {
    const arrayIngredients = [];
    const maxIngredients = 20;

    for (let index = 1; index <= maxIngredients; index += 1) {
      if (recipeData[`strIngredient${index}`] !== ''
      && recipeData[`strIngredient${index}`] !== null
      && recipeData[`strIngredient${index}`] !== undefined
      ) {
        arrayIngredients.push({
          ingredient: recipeData[`strIngredient${index}`],
          measure: recipeData[`strMeasure${index}`],
        });
      }
    }
    return arrayIngredients;
  };

  const allIngredients = renderIngredients(recipeInProgress);

  const handleShareIcon = (idRecipe, path) => {
    const fullPath = `http://localhost:3000/${path}/${idRecipe}`;
    const tempElement = document.createElement('textarea');
    tempElement.value = fullPath;
    tempElement.setAttribute('readonly', '');
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    const linkCopy = document.createElement('p');
    linkCopy.innerHTML = 'Link copiado!';
    document.querySelector('.buttons').appendChild(linkCopy);
  };

  const handleFavoriteRecipes = () => {
    let newFavRecipe = {};
    if (location.includes('comidas')) {
      newFavRecipe = {
        id: recipeInProgress.idMeal,
        type: 'comida',
        area: recipeInProgress.strArea,
        category: recipeInProgress.strCategory,
        alcoholicOrNot: '',
        name: recipeInProgress.strMeal,
        image: recipeInProgress.strMealThumb,
      };
    } else {
      newFavRecipe = {
        id: recipeInProgress.idDrink,
        type: 'bebida',
        area: '',
        category: recipeInProgress.strCategory,
        alcoholicOrNot: recipeInProgress.strAlcoholic,
        name: recipeInProgress.strDrink,
        image: recipeInProgress.strDrinkThumb,
      };
    }
    if (!favoriteRecipe) {
      if (!localStorageFavs) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...localStorageFavs, newFavRecipe]));
      }
      setFavoriteRecipe(true);
    } else {
      localStorageFavs.forEach((item, index) => {
        if (item.id === newFavRecipe.id) {
          localStorageFavs.splice(index, 1);
          localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavs));
        }
      });
      setFavoriteRecipe(false);
    }
  };

  const renderFood = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strMealThumb }
        alt="recipe-meal"
        width="200px"
      />
      <h2 data-testid="recipe-title">{ recipeInProgress.strMeal }</h2>
      <div className="buttons">
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share icon"
          onClick={ () => handleShareIcon(recipeInProgress.idMeal, 'comidas') }
          aria-hidden="true"
        />
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          onClick={ handleFavoriteRecipes }
          aria-hidden="true"
        />
      </div>
      <h3 data-testid="recipe-category">{ recipeInProgress.strCategory }</h3>
      {allIngredients.map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id="checkbox"
            onChange={ () => handleIngredients(index) }
          />
          <p id={ `${index}-ingredient` }>
            {`${ingredient.ingredient}: ${(ingredient.measure === null)
              ? 'a gosto'
              : ingredient.measure}`}
          </p>
        </div>
      ))}
      <span data-testid="instructions">{ recipeInProgress.strInstructions }</span>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderDrink = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeInProgress.strDrinkThumb }
        alt="recipe-drink"
        width="200px"
      />
      <h2 data-testid="recipe-title">{ recipeInProgress.strDrink }</h2>
      <div className="buttons">
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share icon"
          onClick={ () => handleShareIcon(recipeInProgress.idDrink, 'bebidas') }
          aria-hidden="true"
        />
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          onClick={ handleFavoriteRecipes }
          aria-hidden="true"
        />
      </div>
      <h3 data-testid="recipe-category">{ recipeInProgress.strAlcoholic }</h3>
      {allIngredients.map((ingredient, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id="checkbox"
            onChange={ () => handleIngredients(index) }
          />
          <p id={ `${index}-ingredient` }>
            {`${ingredient.ingredient}: ${(ingredient.measure === null)
              ? 'a gosto'
              : ingredient.measure}`}
          </p>
        </div>
      ))}
      <span data-testid="instructions">{ recipeInProgress.strInstructions }</span>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ isDisabled }
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderRecipes = () => (
    (location.includes('comidas')) ? (renderFood()) : (renderDrink())
  );

  return (
    <div>
      {isFetching ? renderLoading() : renderRecipes() }
    </div>
  );
}

export default RecipesInProgress;
