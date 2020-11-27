import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import './DrinksDetails.css';

const DrinksDetails = (props) => {
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const { title, setTitle } = useContext(HeaderContext);
  const {
    recipeObject,
    recipesInProgress,
    setRecipesInProgress,
  } = useContext(RecipesContext);
  const {
    recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    setRecipeCategory,
    recipeAlc,
    setRecipeAlc,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeRecomendations,
    setRecipeRecomendations,
  } = recipeObject;
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const ingredientsMount = (jsonRecipe) => {
    const initalIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.drinks[0])
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      .filter((ar) => ar[1] !== null && ar[1] !== '')
      .map((ar2) => ar2[1]);
    console.log(ingredients);
    const ingredientsMeasures = [];
    for (let i = initalIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures.push(ingredients[i]
        .concat(' - ', `${ingredients[i + ingredients.length / halfIndex]} `));
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const fetchRecipe = async () => {
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    console.log(jsonRecipe.drinks[0]);
    setRecipeTitle(jsonRecipe.drinks[0].strDrink);
    setRecipeCategory(jsonRecipe.drinks[0].strCategory);
    setRecipeAlc(jsonRecipe.drinks[0].strAlcoholic);
    setRecipeInstructions(jsonRecipe.drinks[0].strInstructions);
    setRecipeImage(jsonRecipe.drinks[0].strDrinkThumb);
    ingredientsMount(jsonRecipe);
  };

  const fecthRecomendations = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeRecomendations([jsonRecipe.meals[0], jsonRecipe.meals[1]]);
  };

  const buttonMount = () => {
    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const findElement = doneRecipes.find((item) => item.id === id);
      if (findElement !== undefined) {
        return false;
      }
    }
    return true;
  };

  const setButtonTitle = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
      const recipesIds = Object.keys(recipes);
      const findElement = recipesIds.find((recipeId) => recipeId === id);
      if (findElement !== undefined) {
        setBtnTitle('Continuar Receita');
      }
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
      type: 'bebida',
      area: '',
      category: recipeCategory,
      alcoholicOrNot: recipeAlc,
      name: recipeTitle,
      image: recipeImage,
    };
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    recipes.push(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
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

  const handleClick = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      recipes.cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
    }
    const path = `/bebidas/${id}/in-progress`;
    setRecipesInProgress(recipesInProgress.concat(id));
    props.history.push(path);
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

  useEffect(() => {
    setTitle('Drink Details');
    fetchRecipe();
    fecthRecomendations();
    setButtonTitle();
    setLikeImage();
  }, []);

  return (
    <div>
      <h1>
        { title }
      </h1>
      <img
        src={ recipeImage }
        alt={ recipeTitle }
        data-testid="recipe-photo"
        className="image-display"
      />
      <div>
        <p data-testid="recipe-title">{recipeTitle}</p>
        <div>
          <img src={ shareIcon } alt="share" data-testid="share-btn" />
          <button type="button" onClick={ handleImage }>
            <img
              src={ btnImg }
              alt="like"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      <p data-testid="recipe-category">{recipeCategory}</p>

      <ul>
        {recipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>

      <h3 data-testid="instructions">{recipeInstructions}</h3>

      <div>
        {recipeRecomendations.map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            {item.strMeal}
          </div>
        ))}
      </div>

      {
        buttonMount() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ handleClick }
          >
            {btnTitle}
          </button>
        )
      }
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default DrinksDetails;
