import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => {
  const [storageEmail, setStorageEmail] = useState('');

  const localStorageEmail = JSON.parse(localStorage.getItem('user'));
  const email = Object.values(localStorageEmail);

  useEffect(() => {
    setStorageEmail(email);
  }, []);

  return (
    <section>
      <Header title="Perfil" />
      <div>
        <span data-testid="profile-email">{storageEmail}</span>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>

      </div>
      <Footer />
    </section>
  );
};

export default Perfil;
