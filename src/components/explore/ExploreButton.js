import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ExploreButton({ title, url, testId }) {
  return (
    <Link
      to={ url }
      data-testid={ testId }
      className="button-explore"
    >
      { title }
    </Link>
  );
}

ExploreButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ExploreButton;
