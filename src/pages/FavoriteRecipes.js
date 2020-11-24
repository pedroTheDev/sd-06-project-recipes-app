import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

export default function FavoriteRecipes(props) {
  const { history: { location: { pathname } } } = props;
  return (
    <Header pathname={ pathname } />
  );
}

FavoriteRecipes.propTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
