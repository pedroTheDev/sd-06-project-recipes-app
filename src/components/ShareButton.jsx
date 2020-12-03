import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [messegeShareLink, setMessegeShareLink] = useState('');
  // { match: { url } }
  const shareLinkButton = async () => {
    // navigator.clipboard.writeText(`http://localhost:3000${RecipeUrl}`);
    setMessegeShareLink('Link copiado!');
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareLinkButton() }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <p>{messegeShareLink}</p>
    </div>
  );
}

ShareButton.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareButton;
