import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './ShareButton.css';

function ShareButton({ path }) {
  const [copiedPath, setCopiedPath] = useState();

  const handleShare = () => {
    const completePath = `http://localhost:3000${path.replace('/in-progress', '')}`;
    navigator.clipboard.writeText(completePath);
    setCopiedPath(completePath);
  };

  return (
    <div className="share-btn-container">
      <button
        type="button"
        onClick={ handleShare }
        className="share-btn"
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      { copiedPath && <p className="share-text">Link copiado!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShareButton;
