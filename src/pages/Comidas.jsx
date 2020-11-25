import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import Footer from '../components/Footer';
import CardsFood from '../components/CardsFood';

function Comidas({ history }) {
  const {
    cards: {
      cardFood,
    },
  } = useContext(RecipesAppContext);

  if (cardFood.length === 1) {
    const { idMeal } = cardFood[0];
    history.push(`/comidas/${idMeal}`);
  }

  const buttonIs = true;

  return (
    <div>
      <Header name="Comidas" button={ buttonIs } />
      <CardsFood />
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
