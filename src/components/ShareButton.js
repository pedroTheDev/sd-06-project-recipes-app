import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ path }) {
  const [copiedPath, setCopiedPath] = useState();

  const handleShare = () => {
    const completePath = `http://localhost:3000${path.replace('/in-progress', '')}`;
    navigator.clipboard.writeText(completePath);
    setCopiedPath(completePath);
  };

  return (
    <div>
      <button type="button" onClick={ handleShare }>
        <img
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      { copiedPath && <p>Link copiado!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShareButton;
