import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <header>
        <Link to="/perfil">
          <button
           // aria-label evita aparecer o erro:
           // A control must be associated with a text label
            aria-label="profile-btn"
            type="button"
            src={profileIcon}
            data-testid="profile-top-btn"
          />
        </Link>
        <div>
          {window.location.pathname === '/comidas' ? <h2 data-testid="page-title">Comidas</h2> : <h2 data-testid="page-title">Bebidas</h2>}
        </div>
        <button
          aria-label="search-btn"
          type="button"
          src={searchIcon}
          data-testid="search-top-btn"
        />
      </header>
    </div>
  );
}

export default Header;
