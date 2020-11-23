import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Perfil() {
  const { email } = JSON.parse(localStorage.user);

  const handleClearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <h1 data-testid="page-title">Perfil</h1>
      <span data-testid="profile-email">{ email }</span>
      <Link to="receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={handleClearLocalStorage}
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
