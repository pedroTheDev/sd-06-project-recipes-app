import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProfilePage() {
  const userEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header pageName="Perfil" />
      <br />
      <br />
      <br />
      <br />
      <div className="profile-page-div">
        <p data-testid="profile-email">{ userEmail && userEmail.email }</p>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
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
            onClick={ () => window.localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
