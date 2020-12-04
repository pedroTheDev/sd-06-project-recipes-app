import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ datatestid, linkToCopy }) {
  const [message, setMessage] = useState(false);
  function setFeedBackMessage() {
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    if (linkToCopy) return navigator.clipboard.writeText(`http://localhost:3000${linkToCopy}`);
    const link = window.location.href.toString();
    navigator.clipboard.writeText(link);
    setFeedBackMessage();
  }

  return (
    <button
      type="button"
      onClick={ () => {
        copyToClip();
        setMessage(true);
      } }
    >
      <img
        data-testid={ datatestid || 'share-btn' }
        type="button"
        src={ shareIcon }
        alt="shareIcon"
      />
      { message ? 'Link Copiado!' : 'Copiar' }
    </button>
  );
}

ShareButton.propTypes = {
  datatestid: PropTypes.string.isRequired,
  linkToCopy: PropTypes.string.isRequired,
};

export default ShareButton;
