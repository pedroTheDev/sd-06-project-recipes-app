import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';

const FoodInProgress = ({
  match: { params: { id } },
  history: { location: { pathname } },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [btnImg, setBtnImg] = useState('');
  const [inProgressRecipes, setInProgressRecipes] = useState(true);
  const { setTitle } = useContext(HeaderContext);
  const { recipeObject } = useContext(RecipesContext);
  const { recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    recipeArea,
    setRecipeArea,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeTags,
    setRecipeTags,
  } = recipeObject;

  const ingredientsMount = (jsonRecipe) => {
    const initialIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.meals[0])
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      .filter((ar) => ar[1] !== null && ar[1] !== ' ' && ar[1] !== '')
      .map((ar2) => ar2[1]);
    const ingredientsMeasures = [];
    for (let i = initialIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures
        .push(`${ingredients[i]} - ${ingredients[i + ingredients.length / halfIndex]}`);
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeTitle(jsonRecipe.meals[0].strMeal);
    setRecipeCategory(jsonRecipe.meals[0].strCategory);
    setRecipeImage(jsonRecipe.meals[0].strMealThumb);
    setRecipeInstructions(jsonRecipe.meals[0].strInstructions);
    setRecipeArea(jsonRecipe.meals[0].strArea);
    const tags = jsonRecipe.meals[0].strTags.split(',');
    const onlyTwoTags = [tags[0], tags[2]];
    setRecipeTags(onlyTwoTags);
    ingredientsMount(jsonRecipe);
    setIsLoading(false);
  };

  const saveProgress = (ingredient) => {
    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (previousProgress.meals[id]) {
      if (previousProgress.meals[id].includes(ingredient)) {
        previousProgress.meals[id] = previousProgress.meals[id]
          .filter((item) => item !== ingredient);
      } else {
        previousProgress.meals[id].push(ingredient);
      }
    } else {
      previousProgress.meals[id] = [ingredient];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
    setInProgressRecipes(previousProgress);
  };

  const handleChecked = ({ target: { name } }) => {
    saveProgress(name);
  };

  const handleCheckedFromLocalStorage = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return previousLocalStorage.meals[id].find((currentItem) => currentItem === item);
    }
    return false;
  };

  const handleClass = (item) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const previousLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const isThere = previousLocalStorage.meals[id]
        .find((currentItem) => currentItem === item);
      if (isThere) {
        return 'is-checked';
      }
    }
    return 'is-not-checked';
  };

  const recheckLocalStorage = () => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipesPattern = {
        meals: {
          [id]: [],
        },
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify(inProgressRecipesPattern));
    }
  };

  const unLikeRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unSave = recipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unSave));
  };

  const saveFavoriteRecipe = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = {
      id,
      type: 'comida',
      area: recipeArea,
      category: recipeCategory,
      alcoholicOrNot: '',
      name: recipeTitle,
      image: recipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  };

  const setLikeImage = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const findElement = recipes.find((item) => item.id.toString() === id);
      if (findElement !== undefined) {
        setBtnImg(fullLikeIcon);
      } else {
        setBtnImg(likeIcon);
      }
    } else {
      setBtnImg(likeIcon);
    }
  };

  const handleImage = () => {
    if (btnImg === likeIcon) {
      setBtnImg(fullLikeIcon);
      saveFavoriteRecipe();
    } else {
      setBtnImg(likeIcon);
      unLikeRecipe();
    }
  };

  const handleFinishRecipe = (ingredientsLength) => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const ingredientsInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (ingredientsLength === ingredientsInProgress.meals[id].length) {
        return false;
      }
      return true;
    }
  };

  const handleDoneLocalStorage = () => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const previousDoneData = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneData = [
      ...previousDoneData,
      {
        id,
        type: 'comida',
        area: recipeArea,
        category: recipeCategory,
        alcoholicOrNot: '',
        name: recipeTitle,
        image: recipeImage,
        doneDate: Date('DD-MM-YYYY'),
        tags: recipeTags,
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneData));
  };

  useEffect(() => {
    setTitle('Food In Progress');
    fetchRecipe();
    setLikeImage();
    recheckLocalStorage();
  }, []);

  useEffect(() => {
  }, [inProgressRecipes]);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipeImage } alt={ recipeTitle } />
      <h1 data-testid="recipe-title">{recipeTitle}</h1>
      <div>
        <ShareButton path={ pathname } />
        <button type="button" onClick={ handleImage }>
          <img
            src={ btnImg }
            alt="like"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <h3 data-testid="recipe-category">{recipeCategory}</h3>
      <ul>
        { !isLoading && recipeIngredients.map((item, index) => (
          <li
            data-testid={ `${index}-ingredient-step` }
            key={ item }
          >
            <label
              htmlFor={ item }
              className={ handleClass(item) }
            >
              <input
                type="checkbox"
                checked={ handleCheckedFromLocalStorage(item) }
                name={ item }
                id={ item }
                onChange={ handleChecked }
              />
              { item }
            </label>
          </li>
        ))}

      </ul>
      <p data-testid="instructions">{recipeInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ handleFinishRecipe(recipeIngredients.length) }
          onClick={ handleDoneLocalStorage }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
};

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default FoodInProgress;
