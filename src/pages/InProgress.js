import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../components/Header';
import whiteIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getRecipeMealByIdApi } from '../services/mealsAPI';
import { getRecipeDrinkByIdApi } from '../services/drinksAPI';
import blackIcon from '../images/blackHeartIcon.svg';
import '../Css/inProgress.css';
// import CheckboxInProgress from '../components/CheckboxInProgress';

function InProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [urlWasCopyToClipboard, seturlWasCopyToClipboard] = useState(false);

  // const { recipeMeal, recipeDrink } = useContext(MealsContext);

  const location = useLocation();
  const { id } = useParams();

  function verifyFavoriteRecipe() {
    const valorZero = 0;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const indexRecipe = favoriteRecipes.findIndex((item) => item.id === id);
      if (indexRecipe >= valorZero) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    async function fetchData() {
      const localStorageInProgress = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      if (localStorageInProgress.meals[id] !== null
          || localStorageInProgress.cocktails[id] !== null) {
        if (location.pathname.includes('comidas')) {
          const recipeMeal = await getRecipeMealByIdApi(id);
          const newRecipe = {
            id: recipeMeal[0].idMeal,
            area: recipeMeal[0].strArea,
            alcoholicOrNot: '',
            image: recipeMeal[0].strMealThumb,
            name: recipeMeal[0].strMeal,
            category: recipeMeal[0].strCategory,
            ingredients: localStorageInProgress.meals[id],
            instructions: recipeMeal[0].strInstructions,
          };
          setRecipeInProgress(newRecipe);
        } else {
          const recipeDrink = await getRecipeDrinkByIdApi(id);
          const newRecipe = {
            id: recipeDrink[0].idDrink,
            area: '',
            alcoholicOrNot: recipeDrink[0].strAlcoholic,
            image: recipeDrink[0].strDrinkThumb,
            name: recipeDrink[0].strDrink,
            category: recipeDrink[0].strCategory,
            ingredients: localStorageInProgress.cocktails[id],
            instructions: recipeDrink[0].strInstructions,
          };
          setRecipeInProgress(newRecipe);
        }
      }
      setLoading(false);
    }
    setLoading(true);
    const myFavorite = verifyFavoriteRecipe();
    setIsFavorite(myFavorite);

    fetchData();
  }, []);

  // const handleChange = (index) => {
  //   const value = !ingredientsCheckbox[index].checkbox;
  //   const markedCheckbox = ingredientsCheckbox;
  //   markedCheckbox[index].checkbox = value;
  //   setIngredientsCheckbox(markedCheckbox);
  // };

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    seturlWasCopyToClipboard(true);
  }

  function FavoriteRecipeClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      let myType = 'comida';
      let myAlcoolic = '';
      if (location.pathname.includes('bebidas')) {
        myType = 'bebida';
        myAlcoolic = recipeInProgress.alcoholicOrNot;
      }
      if (!isFavorite) {
        const newFavoriteRecipe = {
          id: recipeInProgress.id,
          type: myType,
          area: recipeInProgress.area,
          category: recipeInProgress.category,
          alcoholicOrNot: myAlcoolic,
          name: recipeInProgress.name,
          image: recipeInProgress.image,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      } else {
        const arrayFavoriteRecipe = favoriteRecipes.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      }
    }
  }

  return (
    (recipeInProgress.ingredients === undefined || loading)
      ? <h5>Loading...</h5>
      : (
        <div>
          <Header data-testid="recipe-title" />
          <img
            data-testid="recipe-photo"
            src={ recipeInProgress.image }
            alt="nome da receita"
          />
          <div>
            <h2 data-testid="recipe-title">{ recipeInProgress.name }</h2>
            <div>
              <button
                type="button"
                data-testid="share-btn"
                className="app-button-transparent"
                onClick={ copyToClipboard }
              >
                <img src={ shareIcon } alt="Share" />
              </button>
              <button
                type="button"
                className="app-button-transparent"
                onClick={ FavoriteRecipeClick }
              >
                <img
                  src={ isFavorite ? blackIcon : whiteIcon }
                  alt="Favorite"
                  data-testid="favorite-btn"
                />
              </button>
            </div>
            { urlWasCopyToClipboard ? <h6>Link copiado!</h6> : null }
          </div>
          <p data-testid="recipe-category">
            {recipeInProgress.category}
          </p>
          <h3>Ingredients</h3>
          <form className="form-checkbox">
            {recipeInProgress.ingredients.map((item, index) => (
              <label
                htmlFor="checkbox"
                key={ index }
                data-testid={ `${index}ingredient-step` }
              >
                <input
                  // onChange={ () => handleChange(index) }
                  value={ item.checked }
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                />
                { ` ${item.ingredient} (${item.measure})` }
              </label>
            ))}
          </form>
          <h3>Instrucoes</h3>
          <p
            data-testid="instructions"
          >
            {recipeInProgress.instructions}
          </p>
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </Link>
        </div>
      ));
}

export default InProgress;
