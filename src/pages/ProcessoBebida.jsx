import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestApiDrinkDetails } from '../services/requestDrink';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';

function ProcessoBebida({ match: { params: { id } } }) {
  const zero = 0;
  const quinze = 15;
  const [detailsDrink, setdetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  useEffect(() => {
    requestApiDrinkDetails(id)
      .then((response) => {
        setdetailsDrink(response[0]);
      });
  }, []);

  const ingredientsFunc = () => {
    if (detailsDrink.length !== zero) {
      const array = [];
      for (let i = 1; i <= quinze; i += 1) {
        const detIngredient = `${detailsDrink[`strIngredient${i}`]}`;
        // const detMeasure = `${detailsDrink[`strMeasure${i}`]}`;
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
    }
  };

  useEffect(() => {
    ingredientsFunc();
  }, [detailsDrink]);

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/bebidas/${id}`;
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

  if (detailsDrink.length === zero) {
    return (
      <div>Loading...</div>);
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ detailsDrink.strDrinkThumb }
        alt="food-thumb"
      />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <h3 data-testid="recipe-category">{detailsDrink.strCategory}</h3>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="img-button-share" />
        </button>
        <FavoriteHeart id={ id } detailsDrink={ detailsDrink } />
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
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

ProcessoBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProcessoBebida;
