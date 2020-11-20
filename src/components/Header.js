import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { header: { page, search } } = useContext(AppContext);
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <div className="header">
        <Link to="/perfil"><img data-testid="profile-top-btn" alt="profile" src={profileIcon} /></Link>
        <div data-testid="page-title">{page}</div>
        {search ? <button className="search-button" type="button" onClick={() => setSearchBar(!searchBar)}><img data-testid="search-top-btn" alt="profile" src={searchIcon} /></button> : <div />}
      </div>
      { searchBar
        ? (
          <div className="search-bar">
            <input type="text" data-testid="search-input" />
            <div>
              <input type="radio" id="ingredient" name="type-search" data-testid="ingredient-search-radio" />
              <label htmlFor="ingredient">Ingrediente</label>
              <input type="radio" id="name" name="type-search" data-testid="name-search-radio" />
              <label htmlFor="name">Nome</label>
              <input type="radio" id="first-letter" name="type-search" data-testid="first-letter-search-radio" />
              <label htmlFor="first-letter">Primeira letra</label>
            </div>
            <button type="button" data-testid="exec-search-btn">Buscar</button>
          </div>
        ) : ''}
    </div>
  );
}

export default Header;
