import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const [windowLink, setWindowLink] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareClick = () => {
    let url = window.location.href;
    if (url.includes('in-progress')) {
      url = url.split('/in-progress');
    }
    if (url.includes('feitas')){
      console.log('Corno!')
    }

    setWindowLink(url[0]);
    setLinkCopied(true);
  };

  useEffect(() => {
    let url = window.location.href;
    console.log(url);
    if (url.includes('in-progress')) {
      url = url.split('/in-progress');
    }

    setWindowLink(url[0]);
  }, []);

  return (
    <CopyToClipboard text={ windowLink } onCopy={ () => setLinkCopied(true) }>
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShareClick }
        >
          <img
            src={ shareIcon }
            alt="shareIcon"
          />
        </button>
        {linkCopied ? <span>Link copiado!</span> : null}
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
