import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Perfil.css';

export default function Perfil() {
  return (
    <div className="body-perfil">
      <Header />
      <p data-testid="profile-email">email@email.com</p>

      <div>
        <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
      </div>

      <div>
        <button data-testid="profile-favorite-btn" type="button">Receitas Favoritas</button>
      </div>

      <div>
        <button data-testid="profile-logout-btn" type="button">Sair</button>
      </div>

      <Footer />
    </div>
  );
}
