import React from 'react';
import { Link } from 'react-router-dom';

function Header({name}) {
  return (
    <div>
      <Link to="/perfil">
        <button className="logo-profile" data-testid="profile-top-btn">profile-icon</button>
      </Link>
      <h1 data-testid="page-title">{name}</h1>
      <button className="logo-search" data-testid="search-top-btn">search-icon</button>
    </div>
  );
}

export default Header;
