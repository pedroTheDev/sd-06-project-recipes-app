import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../style/ReceitasList.css';
import ReceitasContext from '../context/ReceitasContext';

function BebidaCard() {
  const {
    meals,
  } = useContext(ReceitasContext);

  const doze = 12;

  return (
    meals
      .filter((_, index) => index < doze)
      .map((drink, index) => (
        <div className="drink-card" data-testid={`${index}-recipe-card`}>
          <img
            data-testid={`${index}-card-img`}
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="drink-img"
          />
          <h3 className="drink-name" data-testid={`${index}-card-name`}>
            {drink.strDrink}
          </h3>
        </div>
      )
    )
  );
}

BebidaCard.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default BebidaCard;
