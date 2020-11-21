import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <div
        data-testid="profile-email"
      >
        Email
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
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
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Profile;
