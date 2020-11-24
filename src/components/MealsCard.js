import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../style/ReceitasList.css';
import ReceitasContext from '../context/ReceitasContext';

function ComidaCard() {
  const {
    meals,
  } = useContext(ReceitasContext);
  
  const doze = 12;

  return (
    meals.filter((_, index) => index < doze)
      .map((food, index) => (
        <div className="food-card" data-testid={`${index}-recipe-card`}>
          <img
            data-testid={`${index}-card-img`}
            src={food.strMealThumb}
            alt={food.strMeal}
            className="food-img"
          />
          <h3 className="food-name" data-testid={`${index}-card-name`}>
            {food.strMeal}
          </h3>
        </div>
      ))
  );
}

ComidaCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default ComidaCard;
