import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestApiDrinkDetails } from '../services/requestDrink';
import buttonShare from '../styles/images/shareIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';

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
      <button type="button" data-testid="share-btn">
        <img src={ buttonShare } alt="button-share" />
      </button>
      <button type="button">
        <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="img-button-fav"
        />
      </button>
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
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
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
