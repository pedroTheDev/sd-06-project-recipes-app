import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import Footer from '../components/Footer';

function ExploreFood(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header pathname={ pathname } />
      <p>página de explorar comida</p>
      <Footer />
    </div>
  );
}

export default ExploreFood;

ExploreFood.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
