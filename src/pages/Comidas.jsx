import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import Footer from '../components/Footer';
import CardsFood from '../components/CardsFood';
import ButtonCategoriesFood from '../components/ButtonCategoriesFood';

function Comidas({ history }) {
  const {
    cards: {
      cardFood,
    },
  } = useContext(RecipesAppContext);

  //  esse if só de ve ser ativado se apessoa fizer a requisição pelo HeaderSearch alterar
  if (cardFood.length === 1) {
    const { idMeal } = cardFood[0];
    history.push(`/comidas/${idMeal}`);
  }

  const namePage = 'Comidas';
  const buttonIs = true;

  return (
    <div>
      <Header name={ namePage } button={ buttonIs } />
      <ButtonCategoriesFood />
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
