import React from 'react';

function Header() {
  return (
    <header>
      <button data-testid="profile-top-btn" type="button">Perfil</button>
      <h2 data-testid="page-title">Comidas</h2>
      <button data-testid="search-top-btn" type="button">Pesquisar</button>
    </header>
  );
}

export default Header;
