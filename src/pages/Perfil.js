import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const history = useHistory();
  const [user, setUser] = useState('');

  const handleQuit = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const retrievedUsername = JSON.parse(localStorage.getItem('user'));
    setUser(retrievedUsername.email);
  }, []);

  return (
    <main className="default-page">
      <Header pageName="Perfil" renderSearch={ false } />
      <h2 data-testid="profile-email">{user}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => handleQuit() }
      >
        Sair
      </button>
      <Footer />
    </main>
  );
}

export default Perfil;
