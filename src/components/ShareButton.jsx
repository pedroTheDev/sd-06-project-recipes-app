import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ match: { url } }) {
  const [messegeShareLink, setMessegeShareLink] = useState('');

  const shareLinkButton = async (RecipeUrl) => {
    navigator.clipboard.writeText(`http://localhost:3000${RecipeUrl}`);
    setMessegeShareLink('Link copiado!');
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareLinkButton(url) }
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
