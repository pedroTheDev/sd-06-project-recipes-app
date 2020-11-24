import React from 'react';
import PropTypes from 'prop-types';

export default function Recipe(props) {
  const { match: { params: { id } } } = props;
  return (
    <>
      {id}
      {' '}
    </>);
}

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
