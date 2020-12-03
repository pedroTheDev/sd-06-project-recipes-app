import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ datatestid, linkToCopy }) {
  const [message, setMessage] = useState(false);

  function setFeedBackMessage() {
    setMessage(true);
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    setFeedBackMessage();
    if (linkToCopy) return navigator.clipboard.writeText(`http://localhost:3000${linkToCopy}`);
    const link = window.location.href.toString();
    navigator.clipboard.writeText(link);
  }

  return (
    <button
      type="button"
      onClick={ () => copyToClip() }
    >
      { message ? 'Link Copiado!' : (
        <img
          data-testid={ datatestid || 'share-btn' }
          type="button"
          src={ shareIcon }
          alt="shareIcon"
        />
      )}
    </button>
  );
}

ShareButton.propTypes = {
  datatestid: PropTypes.string.isRequired,
  linkToCopy: PropTypes.string.isRequired,
};

export default ShareButton;
