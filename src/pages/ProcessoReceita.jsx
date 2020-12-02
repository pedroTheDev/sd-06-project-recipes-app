import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestApiFoodDetails } from '../services/requestFood';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';
import '../styles/Processos.css';

function ProcessoReceita({ match: { params: { id } } }) {
  const zero = 0;
  const vinte = 20;
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [countCheck, setCountCheck] = useState(zero);
  useEffect(() => {
    requestApiFoodDetails(id)
      .then((response) => {
        setDetailsFood(response[0]);
      });
  }, []);

  const ingredientsFunc = () => {
    if (detailsFood.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i += 1) {
        const detIngredient = `${detailsFood[`strIngredient${i}`]}`;
        // const detMeasure = `${detailsFood[`strMeasure${i}`]}`;
        const ingredient = `${detIngredient}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '' && element !== 'null');
      setArrayIngredients(arrayReturn);
    }
  };

  const riskCheckBox = (event) => {
    const checkBox = document.getElementById(`${event.target.id}`);
    if (checkBox.checked) {
      const labelBox = document.getElementsByName(`${event.target.id}`);
      labelBox[0].className = 'riscado';
      setCountCheck(countCheck + 1);
    } else {
      setCountCheck(countCheck - 1);
    }
  };

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/comidas/${id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
  };

  useEffect(() => {
    ingredientsFunc();
  }, [detailsFood]);

  if (detailsFood.length === zero) {
    return (
      <div>Loading...</div>);
  }

  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsFood.strMealThumb } alt="food-thumb" />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="button-share" />
        </button>
        <FavoriteHeart id={ id } detailsFood={ detailsFood } />
      </div>
      {arrayIngredients.map((element, index) => (
        <label
          htmlFor="scales"
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          name={ index }
        >
          <input type="checkbox" id={ index } name="scales" onChange={ riskCheckBox } />
          { element }
        </label>
      ))}
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ arrayIngredients.length !== countCheck }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

ProcessoReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProcessoReceita;
