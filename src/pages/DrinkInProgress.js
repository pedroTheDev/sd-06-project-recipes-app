import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetail, fetchRecommendation } from '../helpers/Helper';
import saveInStorage from '../helpers/saveInStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

import '../css/itemDetails.css';
import '../css/scroller.css';

export default function DrinkInProgress(props) {
  const [recipe, setRecipe] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [btnStartValue, setBtnStartValue] = useState('Iniciar Receita');
  const [copy, setCopy] = useState('');
  const [fav, setFav] = useState(whiteHeart);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchData() {
      const currRecipe = await fetchDetail('bebidas', id);
      setRecipe(currRecipe);
      const results = await fetchRecommendation('bebidas');
      setRecommendation(results);

      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgress = (storage) && storage.cocktails[id];

      if (inProgress) {
        setBtnStartValue('Continuar Receita');
        setCheckedIngredients(inProgress);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') === null) {
      setDisabled(false);
    }
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFav(blackHeart);
    }
  }, []);

  useEffect(() => {
    const empty = 0;
    if (checkedIngredients.length > empty) {
      checkedIngredients.forEach((ingredient) => {
        const checkbox = document.getElementById(ingredient);
        if (checkbox) checkbox.checked = true;
      });
    }
  }, [checkedIngredients]);

  function handleCopy() {
    const link = `${window.location.origin}/bebidas/${id}`;
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  }

  function handleFav(item) {
    const favObj = [{
      id: item.idDrink,
      type: 'bebida',
      area: '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic,
      name: item.strDrink,
      image: item.strDrinkThumb,
    }];
    if (fav === blackHeart) {
      setFav(whiteHeart);
      localStorage.removeItem('favoriteRecipes');
    }
    if (fav === whiteHeart) {
      setFav(blackHeart);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favObj));
    }
  }

  useEffect(() => {
    if (recipe.drinks) {
      const currRecipe = { ...recipe.drinks[0] };
      const array = [];
      const maxLength = 15;
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

  function strikeIngredientText(target) {
    if (target.checked) {
      saveInStorage(id, target.id, 'cocktails', 'add');
    } else if (!target.checked) {
      saveInStorage(id, target.id, 'cocktails', 'remove');
    }

    return (target.checked)
      ? target.parentNode.classList.add('strike-text')
      : target.parentNode.classList.remove('strike-text');
  }

  function renderIngredients() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      return (
        <div>
          { recipeDetails.filter((ingredient) => ingredient !== '' && ingredient !== null)
            .map((ingredient, index) => (
              <label
                htmlFor={ `${ingredient[0]}` }
                key={ ingredient[0] }
                data-testid={ `${index}-ingredient-step` }
                className={ checkedIngredients.includes(ingredient[0])
                  ? 'strike-text' : '' }
              >
                <input
                  type="checkbox"
                  id={ `${ingredient[0]}` }
                  onClick={ ({ target }) => strikeIngredientText(target) }
                />
                { (ingredient[1] === null)
                  ? ingredient[0]
                  : `${ingredient[0]}: ${(ingredient[1]) && ingredient[1]}` }
              </label>
            )) }
        </div>
      );
    }
  }
  if (recipe.drinks && recommendation) {
    const item = recipe.drinks[0];
    return (
      <div>
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strDrinkThumb }
            className="item-img"
          />
          <p data-testid="recipe-title">{item.strDrink}</p>
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
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <p data-testid="instructions">{item.strInstructions}</p>
          {renderIngredients()}
          <p data-testid="video">{item.strYoutube}</p>
          <Link to={ `/bebidas/${id}/in-progress` }>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="btnStart"
              disabled={ disabled }
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
                <p data-testid={ `${index}-recomendation-title` }>{rec.strMeal}</p>
                <img
                  alt="foto da receita"
                  className="item-img"
                  src={ rec.strMealThumb }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>aloudingue</div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
