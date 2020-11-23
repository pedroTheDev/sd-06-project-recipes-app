import React from 'react';
import PropTypes from 'prop-types';

function Header({ name }) {
  return (
    <div>
      <button
        type="button"
        className="logo-profile"
        data-testid="profile-top-btn"
      >
        profile-icon
      </button>
      <h1 data-testid="page-title">{name}</h1>
      <button
        type="button"
        className="logo-search"
        data-testid="search-top-btn"
      >
        search-icon
      </button>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
