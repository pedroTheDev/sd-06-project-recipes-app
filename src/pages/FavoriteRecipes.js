import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function FavoriteRecipes(props) {
  const { title } = props;
  return (
    <Header title={ title } />
  );
}

FavoriteRecipes.propTypes = {
  title: PropTypes.string.isRequired,
};
