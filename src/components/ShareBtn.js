import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn() {
  return (
    <img data-testid="share-btn" src={ shareIcon } alt="shareButton" />
  );
}

export default ShareBtn;
