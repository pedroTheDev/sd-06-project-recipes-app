import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrink(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header pathname={ pathname } />
      <p>Pagina de explorar bebidas</p>
      <Footer />
    </div>
  );
}

export default ExploreDrink;

ExploreDrink.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
