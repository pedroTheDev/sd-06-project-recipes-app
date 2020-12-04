import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import likeIcon from '../images/whiteHeartIcon.svg';
import fullLikeIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './DrinksDetails.css';

const DrinksDetails = (props) => {
  const [btnTitle, setBtnTitle] = useState('Iniciar Receita');
  const [btnImg, setBtnImg] = useState('');
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
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
  } = recipeObject;
  const { match, history: { location: { pathname } } } = props;
  const { params } = match;
  const { id } = params;
  const carouselActiveIndex = 0;
  const carouselPartition = 3;

  const ingredientsMount = (jsonRecipe) => {
    const initialIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.drinks[0])
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
    const path = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeTitle(jsonRecipe.drinks[0].strDrink);
    setRecipeCategory(jsonRecipe.drinks[0].strCategory);
    setRecipeAlc(jsonRecipe.drinks[0].strAlcoholic);
    setRecipeInstructions(jsonRecipe.drinks[0].strInstructions);
    setRecipeImage(jsonRecipe.drinks[0].strDrinkThumb);
    ingredientsMount(jsonRecipe);
  };

  const fetchRecommendations = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    const maximumRecommendations1 = 3;
    const maximumRecommendations2 = 6;
    const getRecommendations1 = jsonRecipe.meals.filter(
      (recommendation, index) => (index < maximumRecommendations1 && recommendation),
    );
    const getRecommendations2 = jsonRecipe.meals.filter(
      (recommendation, index) => (
        index >= maximumRecommendations1
        && index < maximumRecommendations2
        && recommendation
      ),
    );

    setRecommendations1(getRecommendations1);
    setRecommendations2(getRecommendations2);
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
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
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
    fetchRecommendations();
    setButtonTitle();
    setLikeImage();
  }, []);

  return (
    <div className="main">
      <h1 style={ { textAlign: 'center', marginTop: 20 } }>
        { title }
      </h1>
      <img
        src={ recipeImage }
        alt={ recipeTitle }
        data-testid="recipe-photo"
        className="image-display"
        style={ { borderRadius: 10, marginLeft: 65 } }
      />
      <div>
        <p
          data-testid="recipe-title"
          style={ { textAlign: 'center' } }
        >
          { recipeTitle }
        </p>
        <div>
          <ShareButton path={ pathname } />
          <button
            type="button"
            onClick={ handleImage }
            style={ { width: 70, marginLeft: 180 } }
          >
            <img
              src={ btnImg }
              alt="like"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      <p
        data-testid="recipe-category"
        style={ { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 } }
      >
        { recipeAlc }
      </p>

      <ul style={ { fontSize: 20, fontWeight: 'bold' } }>
        {recipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>

      <h3
        data-testid="instructions"
        style={ { border: '1px solid black',
          padding: 10,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 10 } }
      >
        {recipeInstructions}
      </h3>

      <div
        className="carousel slide w-25"
        data-ride="carousel"
        id="carousel1"
        style={ { borderRadius: 10 } }
      >
        <div className="carousel-inner">
          {recommendations1.map((item, index) => {
            if (index === carouselActiveIndex) {
              return (
                <div
                  key={ item.idMeal }
                  data-testid={ `${index}-recomendation-card` }
                  className="carousel-item active"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    className="d-block w-100"
                    style={ { marginTop: 65, marginLeft: 20, borderRadius: 10 } }
                  />
                  <h5
                    data-testid={ `${index}-recomendation-title` }
                    style={ { marginLeft: 20, borderRadius: 10 } }
                  >
                    { item.strMeal }
                  </h5>
                </div>
              );
            }
            return (
              <div
                key={ item.idMeal }
                data-testid={ `${index}-recomendation-card` }
                className="carousel-item"
              >
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  className="d-block w-100"
                />
                <h5 data-testid={ `${index}-recomendation-title` }>
                  { item.strMeal }
                </h5>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="carousel slide w-25"
        data-ride="carousel"
        id="carousel2"
      >
        <div className="carousel-inner">
          {recommendations2.map((item, index) => {
            if (index === carouselActiveIndex) {
              return (
                <div
                  key={ item.idMeal }
                  data-testid={ `${index + carouselPartition}-recomendation-card` }
                  className="carousel-item active"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    className="d-block w-100"
                  />
                  <h5 data-testid={ `${index + carouselPartition}-recomendation-title` }>
                    { item.strMeal }
                  </h5>
                </div>
              );
            }
            return (
              <div
                key={ item.idMeal }
                data-testid={ `${index + carouselPartition}-recomendation-card` }
                className="carousel-item"
              >
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  className="d-block w-100"
                  style={ { borderRadius: 10 } }
                />
                <h5 data-testid={ `${index + carouselPartition}-recomendation-title` }>
                  { item.strMeal }
                </h5>
              </div>
            );
          })}
        </div>
      </div>

      {
        buttonMount() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ handleClick }
            style={ { borderRadius: 10,
              backgroundColor: '#9AAD98',
              width: 150,
              height: 55,
              fontWeight: 'bold',
              fontSize: 16 } }
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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default DrinksDetails;
