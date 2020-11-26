import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const getEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">{ getEmail && getEmail.email }</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        className="btn btn-outline-primary"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        className="btn btn-outline-primary"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <Link exact to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="btn btn-outline-primary"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
