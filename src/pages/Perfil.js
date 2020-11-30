import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const retrievedUsername = JSON.parse(localStorage.getItem('user'));
    setUser(retrievedUsername.email);
    console.log(user);
  }, []);
  return (
    <main className="default-page">
      <Header pageName="Perfil" renderSearch={false} />
      <h2 data-testid="profile-email">{user}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Receitas Feitas</button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Receitas Favoritas</button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Sair
      </button>
      <Footer />
    </main>
  );
}

export default Perfil;
