import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Perfil.css';

function Perfil() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  function handleExit() {
    localStorage.clear();
  }

  return (
    <div>
      <Header />
      <div className="body-perfil">
        <p data-testid="profile-email">{email}</p>

        <div>
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </div>

        <div>
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </div>

        <div>
          <Link to="/">
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ handleExit }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
