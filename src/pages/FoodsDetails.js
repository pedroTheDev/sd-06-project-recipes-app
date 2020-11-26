import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetail, fetchRecommendation } from '../helpers/Helper';

import '../css/scroller.css';
import '../css/itemDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import saveFavorite from '../helpers/saveFavorite';

export default function FoodsDetails(props) {
  const [recipe, setRecipe] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [btnStartValue, setBtnStartValue] = useState('Iniciar Receita');
  const [copy, setCopy] = useState('');
  const [fav, setFav] = useState(whiteHeart);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchData() {
      const currRecipe = await fetchDetail('comidas', id);
      setRecipe(currRecipe);
      const results = await fetchRecommendation('comidas');
      setRecommendation(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgress = (storage) && storage.meals[id];

    if (inProgress) {
      setBtnStartValue('Continuar Receita');
    }

    if (localStorage.getItem('favoriteRecipes') !== null) {
      const tarefa = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (tarefa.some((item) => item.id === id)) {
        setFav(blackHeart);
      }
    }
  }, []);

  function handleCopy() {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  }

  function handleFav(item) {
    const favObj = {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
    };
    if (fav === blackHeart) {
      setFav(whiteHeart);
      saveFavorite(id, favObj, 'remove');
    }
    if (fav === whiteHeart) {
      setFav(blackHeart);
      saveFavorite(id, favObj, 'add');
    }
  }

  useEffect(() => {
    if (recipe.meals) {
      const currRecipe = { ...recipe.meals[0] };
      const array = [];
      const maxLength = 20;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== null
          && currRecipe[`strIngredient${number}`] !== '')
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

  function renderIngredients() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      return (
        <div>
          { recipeDetails.filter((ingredient) => ingredient !== '' && ingredient !== null)
            .map((ingredient, index) => (
              <p
                key={ ingredient[0] }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient[0]}: ${ingredient[1]}`}
              </p>
            )) }
        </div>
      );
    }
  }

  if (recipe.meals) {
    const item = recipe.meals[0];
    return (
      <div>
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strMealThumb }
            className="item-img"
          />
          <p data-testid="recipe-title">{item.strMeal}</p>
          <button
            type="button"
            data-testid="share-btn"
            value="Share"
            onClick={ () => handleCopy() }
          >
            <img alt="Share" src={ shareIcon } />
          </button>
          <span>{copy}</span>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ fav }
            onClick={ () => handleFav(item) }
          >
            <img alt="fav" src={ fav } />
          </button>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {renderIngredients()}

          <video data-testid="video" width="340" controls>
            <source src={ item.strYoutube } type="video/mp4" />
            <track src="" kind="captions" />
          </video>

          <Link to={ `/comidas/${id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btnStart"
            >
              {btnStartValue}
            </button>
          </Link>
        </div>
        <div className="testimonials">
          <div className="scroller">
            {recommendation.map((rec, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="item"
              >
                <p data-testid={ `${index}-recomendation-title` }>{rec.strDrink}</p>
                <img
                  alt="foto da receita"
                  className="item-img"
                  src={ rec.strDrinkThumb }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>aló</div>
  );
}

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
