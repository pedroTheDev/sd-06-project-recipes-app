import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import Footer from '../components/Footer';
import { requestApiFoodFilterName } from '../services/requestFood';

function Comidas({ history }) {
  const {
    cards: {
      cardFood,
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  useEffect(() => {
    requestApiFoodFilterName()
      .then((arrayApi) => setCardFood(arrayApi));
  }, []);

  if (cardFood.length === 1) {
    const { idMeal } = cardFood[0];
    history.push(`/comidas/${idMeal}`);
  }

  const buttonIs = true;
  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  return (
    <div>
      <Header name="Comidas" button={ buttonIs } />
      <div>
        {(cardFood.length === 0) ? <span>Loading...</span> : cardFood
          .slice(ofTheFirstParameter, upToParameter12).map(({
            idMeal,
            strMeal,
            strMealThumb,
          }, index) => (
            <Link
              key={ idMeal }
              to={ `/comidas/${idMeal}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { strMeal }
              </h4>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Comidas;
