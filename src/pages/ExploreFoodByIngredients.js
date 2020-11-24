import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodByIngredients(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header pathname={ pathname } />
      <p>pagina de explorar comida por engrediente</p>
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;

ExploreFoodByIngredients.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
