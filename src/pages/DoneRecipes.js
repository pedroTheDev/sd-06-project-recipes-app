import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function DoneRecipes(props) {
  const { title } = props;
  return (
    <Header title={ title } />
  );
}

DoneRecipes.propTypes = {
  title: PropTypes.string.isRequired,
};
