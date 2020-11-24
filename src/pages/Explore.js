import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <div>
      <Header pathname={ pathname } />
      <p>Página de explorar</p>
      <Footer />
    </div>

  );
}

export default Explore;

Explore.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
