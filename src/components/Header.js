import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { useHistory } from "react-router";
import SearchBar from './SearchBar';

export default function Header({ pageName, renderSearch }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const renderSearchIcon = () => {
    return (
      <img
        className="header-icon"
        src={searchIcon}
        alt="searchIcon"
        data-testid="search-top-btn"
        onClick={() => setShowSearchBar(!showSearchBar)}
      />
    );
  };
  return (
    <header>
      <img
        className="header-icon"
        src={profileIcon}
        alt="profileIcon"
        data-testid="profile-top-btn"
        onClick={() => history.push('/perfil')}
      />
      <h2 data-testid="page-title">{ pageName }</h2>
      { renderSearch ? renderSearchIcon() : null}
      { showSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool.isRequired,
};
