import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

export default function DoneRecipes(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <Header pathname={ pathname } />
  );
}

DoneRecipes.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
