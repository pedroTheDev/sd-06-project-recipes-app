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
    <a href onClick={ () => setSearch(!search) }>
      <img src={ SearchIcon } alt="Profile" data-testid="search-top-btn" />
    </a>
  );
  return (
    <div>
      <header>
        <div className="container">
          <div className="row justify-content-around">
            <Link to="/perfil">
              <img src={ ProfileIcon } alt="Profile" data-testid="profile-top-btn" />
            </Link>
            <h1 data-testid="page-title">{title}</h1>
            {!searchButton && searchButtonHidden()}
          </div>
        </div>
      </header>
      {search && <SearchBar title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
