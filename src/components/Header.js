import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ pageName, renderSearch }) {
  const teste = 'teste';
  return (
    <header>
      <img src={profileIcon} alt="profileIcon" data-testid="profile-top-btn" />
      <h2 data-testid="page-title">{ pageName }</h2>
      { renderSearch ? <img src={searchIcon} alt="searchIcon" data-testid="search-top-btn" /> : null}
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool.isRequired,
};
