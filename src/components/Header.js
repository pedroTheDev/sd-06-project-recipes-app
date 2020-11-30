import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import RevenueContext from '../context/RevenueContext';
import SearchBar from './Search';
import CategoryButton from './CategoryButton';

export default function Header(props) {
  const { title } = props;
  const { search, setSearch, searchButton } = useContext(RevenueContext);
  const searchButtonHidden = () => (
    // <a
    //   href
    //   data-testid="test-search-top-btn"
    //   onClick={ () => {
    //     setSearch(!search);
    //   } }
    // >
    //   <img src={ SearchIcon } alt="Profile" data-testid="search-top-btn" />
    // </a>
    <button
      data-testid="test-search-top-btn"
      type="button"
      onClick={ () => {
        setSearch(!search);
      } }
    >
      <img src={ SearchIcon } alt="Profile" data-testid="search-top-btn" />
    </button>
  );
  return (
    <div>
      <header data-testid="test-header">
        <div className="container">
          <div className="row justify-content-around">
            <Link to="/perfil" data-testid="test-profile-top-btn">
              <img src={ ProfileIcon } alt="Profile" data-testid="profile-top-btn" />
            </Link>
            <h1 data-testid="page-title">{title}</h1>
            {!searchButton && searchButtonHidden()}
          </div>
        </div>
        {search && <SearchBar title={ title } />}
        {!search && <CategoryButton />}
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
