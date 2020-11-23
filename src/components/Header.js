import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

const Header = ({ title, searchBtn = false }) => {
  const { searchBox, setSearchBox } = useContext(ReceitasContext);

  const showSearchBar = () => setSearchBox(!searchBox);
  // comentário para merge
  return (
    <section className="header">
      <Link to="/perfil" className="image">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile button" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {
        searchBtn
          ? (
            <button
              type="button"
              data-testid="search-top-btn"
              className="image"
              onClick={ showSearchBar }
            >
              <img
                src={ searchIcon }
                alt="show-hide-sbr"
              />
            </button>
          )
          : <div className="image" />
      }
    </section>
  );
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
