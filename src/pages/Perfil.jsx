import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Context from '../context/Context';
import Footer from '../Components/Footer';

export default function Perfil({ history }) {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Perfil');
  }, []);

  const email2 = JSON.parse(localStorage.getItem('user'));
  console.log('email', email2.email);

  const onClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header titulo={ titulo } />
      <p data-testid="profile-email">{email2.email}</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ onClick }
      >
        Sair
      </button>

      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired,
  }).isRequired,
};
