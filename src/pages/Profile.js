import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';
import '../style/Profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.user);
  return (
    <div className="profile">
      <div
        data-testid="profile-email"
      >
        { email }
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
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
        <Footer />
      </Link>
    </div>
  );
}

export default Profile;
