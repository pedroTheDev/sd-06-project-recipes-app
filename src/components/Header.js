import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import perfil from '../images/profileIcon.svg';
import busca from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import useSearch from '../hooks/useSearch';

export default function Header(props) {
  const [search, setSearch] = useState(false);

  const { id } = props;
  return (
    <div>
      <div>
        <Link to="/">
          <img
            src={ perfil }
            alt="perfil"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <div>
        <span data-testid="page-title">{ document.title }</span>
      </div>
      <div>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => { setSearch(!search); } }
        >
          <img
            src={ busca }
            alt="busca"
          />
        </button>
      </div>
      {(search) ? <SearchBar id={ id } /> : '' }
    </div>
  );
}
Header.propTypes = {
  id: PropTypes.string.isRequired,
};
