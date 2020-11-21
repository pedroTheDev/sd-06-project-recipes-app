import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      showSearchBar: false,
    };

    this.handleSearchBarButton = this.handleSearchBarButton.bind(this);
  }

  handleSearchBarButton() {
    const { showSearchBar } = this.state;
    if (!showSearchBar) {
      this.setState({
        showSearchBar: true,
      });
    } else {
      this.setState({
        showSearchBar: false,
      });
    }
  }

  render() {
    const { title } = this.props;
    const { showSearchBar } = this.state;
    return (
      <header>
        <div>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
          </Link>
          <h4 data-testid="page-title">{title}</h4>
          <button type="button" onClick={ this.handleSearchBarButton }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        </div>
        {showSearchBar && (
          <div>
            <input type="text" data-testid="search-input" />
          </div>
        )}
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
