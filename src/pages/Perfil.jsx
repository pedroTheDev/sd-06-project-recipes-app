import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Context from '../context/Context';

export default function Perfil() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Perfil');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <h1>{ titulo }</h1>
      <p data-testid="profile-email">email</p>
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
      <Link to="/">
        <button type="button" data-testid="profile-logout-btn">
          Sair
        </button>
      </Link>
    </div>
  );
}
