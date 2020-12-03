import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id }) {
  console.log(typeof id);
  const [showMessage, setShowMessage] = useState(false);

  const CopiedLinkMessage = (
    <div className="copy-message-hidden">
      <span>
        Link copiado!
      </span>
    </div>
  );

  const shareClick = () => {
    const timeToShow = 1500;
    copy(`http://localhost:3000/comidas/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeToShow);
  };

  return (
    <div>
      <button type="button" onClick={ shareClick }>
        <img
          alt="share data"
          data-testid="share-btn"
          src={ shareIcon }
        />
      </button>
      { showMessage && CopiedLinkMessage }
    </div>
  );
}

export default ShareBtn;

ShareBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
