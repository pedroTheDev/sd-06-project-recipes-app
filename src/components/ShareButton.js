import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import formatInProgressLink from '../utils/formatInProgressLink';

function ShareButton({ setMessage, page = null }) {
  function setFeedBackMessage() {
    setMessage(true);
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    let link = window.location.href.toString();
    if (page !== null) {
      link = formatInProgressLink(page, link);
    }
    navigator.clipboard.writeText(link);
    setFeedBackMessage();
  }

  return (
    <button data-testid="share-btn" type="button" onClick={ copyToClip }>
      <img src={ shareIcon } alt="shareIcon" />
    </button>
  );
}

ShareButton.propTypes = {
  setMessage: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default ShareButton;
