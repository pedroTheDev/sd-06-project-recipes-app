import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => {
  const [storageEmail, setStorageEmail] = useState('');

  const localStorageEmail = JSON.parse(localStorage.getItem('user'));
  const email = Object.values(localStorageEmail);

  useEffect(() => {
    setStorageEmail(email);
  }, []);

  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <section>
      <Header title="Perfil" />
      <div>
        <span data-testid="profile-email">{storageEmail}</span>
      </div>
      <div>
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
            onClick={ handleClick }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>

        </Link>
      </div>
      <Footer />
    </section>
  );
};

export default Perfil;
