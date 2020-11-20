import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

const Header = ({ searchBtn = false }) => {
  const { searchBox, setSearchBox } = useContext(ReceitasContext);

  const showSearchBar = () => {
    setSearchBox(!searchBox);
  };

  return (
    <section className="header">
      <Link to="/perfil" >
        <button data-testid="profile-top-btn" className="image">
          <img src={profileIcon} alt="Profile button" />
        </button>
      </Link>
      <h1 data-testid="page-title">{window.location.pathname.replace(/[^a-zA-Z0-9]/g, "")}</h1>
      {searchBtn
        ? (
          <button data-testid="search-top-btn" className="image" onClick={showSearchBar}>
            <img src={searchIcon} alt="show-hide-sbr" />
          </button>
        )
        : <div className="image"></div>
      }
    </section>
  )
};

export default Header;
