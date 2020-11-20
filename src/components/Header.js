import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImage from '../images/profileIcon.svg';
import searchButton from '../images/searchIcon.svg';

function Header({ title }) {
  const [enableSearch, setEnableSearch] = useState(false);
  const history = useHistory();
  function redirectProfile() {
    history.push('/perfil');
  }

  function renderSearch() {
    setEnableSearch(!enableSearch);
  }

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileImage }
        onClick={ redirectProfile }
      >
        <img src={ profileImage } alt="profile-img" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      { (enableSearch) ? <input type="text" data-testid="search-input" /> : undefined }
      <button
        type="button"
        data-testid="search-top-btn"
        src={ searchButton }
        onClick={ renderSearch }
      >
        <img src={ searchButton } alt="search-btn" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
