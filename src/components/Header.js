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
      className="d-flex p-2 bg-secondary align-items-center justify-content-between"
    >
      <Link to="/perfil" className="image">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile button"
        />
      </Link>
      <h2 className="mb-0" data-testid="page-title">
        {title}
      </h2>
      {searchBtn ? (
        <button
          type="button"
          data-testid="search-top-btn"
          className="border-0 bg-transparent p-0"
          onClick={ showSearchBar }
        >
          <img src={ searchIcon } alt="show-hide-sbr" />
        </button>
      ) : (
        <div className="image" />
      )}
    </section>
  );
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
