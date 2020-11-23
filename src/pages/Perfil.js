import React from 'react';
import { Link } from 'react-router-dom';

function Perfil() {
  const getemail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h2 data-testid="page-title">Perfil</h2>
      <h3 data-testid="profile-email">{ getemail.email }</h3>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="btn btn-outline-primary"
        >
          Receitas Feitas
        </button>
      </Link>

      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="btn btn-outline-primary"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link exact to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="btn btn-outline-primary"
          onClick={() => localStorage.clear()}
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Perfil;
