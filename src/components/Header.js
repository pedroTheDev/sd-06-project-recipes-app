import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, searchBtn = false }) => {
  const { searchBox, setSearchBox } = useContext(ReceitasContext);

  const showSearchBar = () => setSearchBox(!searchBox);

  return (
    <section
      className="navbar"
      style={ { background: '#7850B8' } }
    >
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile button"
        />
      </Link>
      <h2 data-testid="page-title">
        {title}
      </h2>
      {searchBtn ? (
        <button
          type="button"
          data-testid="search-top-btn"
          className="border-0 bg-transparent"
          onClick={ showSearchBar }
        >
          <img src={ searchIcon } alt="show-hide-sbr" />
        </button>
      ) : (
        <div />
      )}
    </section>
  );
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
