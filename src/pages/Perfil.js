import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => (
  <section>
    <Header title="Perfil" />
    <div>
      <span data-testid="profile-email">Email</span>
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

export default Perfil;
