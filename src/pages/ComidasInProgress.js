import React from 'react';
import PropTypes from 'prop-types';

const ComidasInProgress = (props) => {
  const { match: { params: { id } } } = props;

  return (
    <div>{id}</div>
  );
};

ComidasInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default ComidasInProgress;
