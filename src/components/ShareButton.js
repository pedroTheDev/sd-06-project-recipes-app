import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [message, setMessage] = useState(false);
  function setFeedBackMessage() {
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    const link = window.location.href.toString();
    navigator.clipboard.writeText(link);
    setFeedBackMessage();
  }

  return (
    <button data-testid="share-btn" type="button" onClick={() => {
      copyToClip();
      setMessage(true);
    } }>
      <img src={ shareIcon } alt="shareIcon" />
      { message ? 'Link Copiado!' : 'Copiar' }
    </button>
  );
}

ShareButton.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default ShareButton;
