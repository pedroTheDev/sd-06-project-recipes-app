import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import './RecipeInProgress.css';

function DrinkInProgress(props) {
  const { match: { params: { id } }, location: { pathname } } = props;
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [copied, setCopied] = useState('none');
  const textArea = useRef(null);
  let progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const zero = 0;
  if (progressRecipes === null) {
    progressRecipes = {
      cocktails: { [id]: [] },
      meals: {},
    };
  }

  const setLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = readLocalStorage !== null ? readLocalStorage : [];
    const newRecipe = { id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied('block');
  };

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setRecipe(response.drinks[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (recipe.length !== zero
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        const value = `${recipe[`strMeasure${i}`]}${recipe[`strIngredient${i}`]}`;
        const ingredient = {
          id: i,
          value,
          isChecked: progressRecipes.cocktails[id].some((e) => e === value),
        };
        TheIngredients.push(ingredient);
      }
    }
    setIngredients(TheIngredients);
  };

  const verifyIngredientsChecked = () => {
    const isAllChecked = !ingredients
      .some((ingredient) => ingredient.isChecked === false);
    setIsDisabled(!isAllChecked);
  };

  const setLocalIngredients = () => {
    if (ingredients.length !== zero) {
      const checkeds = ingredients
        .filter((ingredient) => ingredient.isChecked === true)
        .map((each) => each.value);
      progressRecipes.cocktails[id] = checkeds;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));
    }
  };

  const removeIdLocalSotrage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  };

  const getLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idFavorito = readLocalStorage !== null
      ? readLocalStorage.find((element) => element.id === id)
      : undefined;
    if (idFavorito) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const handleCheckedIngredient = (event, index) => {
    const ingredientsChecked = [...ingredients];
    ingredientsChecked[index].isChecked = event.target.checked;
    setIngredients(ingredientsChecked);
    verifyIngredientsChecked();
  };

  const changesFavorites = () => {
    if (isFavorite) {
      removeIdLocalSotrage();
      setIsFavorite(!isFavorite);
    } else {
      setLocalStorage();
      setIsFavorite(!isFavorite);
    }
  };

  useEffect(() => {
    setLocalIngredients();
  }, [ingredients]);

  useEffect(() => {
    requestIngredients();
  }, [recipe]);

  useEffect(() => {
    requestDetailsAPI();
    getLocalStorage();
  }, []);

  const handleFinishedRecipe = (event) => {
    event.preventDefault();
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <form onSubmit={ handleFinishedRecipe }>
        <img
          className="picture"
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
        />
        <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
        <ShareBtn copy={ copyToClipboard } />
        <FavoriteBtn isFavorite={ isFavorite } changesFavorites={ changesFavorites } />
        <span className="link-copy" style={ { display: copied } }>Link copiado!</span>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>

        <ul>
          Ingredientes:
          {ingredients.map((ingredient, index) => (
            <li data-testid={ `${index}-ingredient-step` } key={ index }>
              { ingredient.value }
              <input
                key={ ingredient.id }
                type="checkbox"
                value={ ingredient.value }
                checked={ ingredient.isChecked }
                onChange={ (ev) => handleCheckedIngredient(ev, index) }
              />
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <textarea
          className="text-area"
          ref={ textArea }
          value={ `http://localhost:3000${pathname}` }
        />
        <button
          data-testid="finish-recipe-btn"
          type="submit"
          disabled={ isDisabled }
        >
          Finalizar receita
        </button>
      </form>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.func.isRequired,
};

export default DrinkInProgress;
