import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ copy }) {
  return (
    <button type="button" onClick={ copy }>
      <img
        data-testid="share-btn"
        src={ shareIcon }
        alt="shareButton"
      />
    </button>
  );
}
ShareBtn.propTypes = {
  copy: PropTypes.func.isRequired,
};
export default ShareBtn;
