import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import RevenueContext from '../context/RevenueContext';
import SearchBar from './Search';

export default function Header(props) {
  const { title } = props;
  const { search, setSearch, searchButton } = useContext(RevenueContext);
  const searchButtonHidden = () => (
    <button
      type="button"
      onClick={ () => setSearch(!search) }
    >
      <img src={ SearchIcon } alt="Profile" data-testid="search-top-btn" />
    </button>
  );
  return (
    <header>
      <div className="d-flex p-2">
        <Link to="/perfil">
          <img src={ ProfileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {!searchButton && searchButtonHidden()}
      </div>
      {search && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
