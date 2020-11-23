import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, fetchApi } = props;
  const { showSearchBar, setSearchBar } = useContext(ContextRecipes);
  const toggleSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">{title}</h2>
      <div>
        <img
          src={ searchIcon }
          alt="Search"
          data-testid="search-top-btn"
          onClick={ toggleSearchBar }
          aria-hidden="true"
        />
        {showSearchBar ? <SearchBar fetchApi={ fetchApi } /> : null}
      </div>
    </div>
  );
}

Header.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
