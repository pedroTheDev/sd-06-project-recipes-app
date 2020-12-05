import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import HeaderContext from '../context/HeaderContext';
import './Profile.css';

const Profile = () => {
  const { setTitle } = useContext(HeaderContext);
  const { setEmail } = useContext(LoginContext);
  const [userEmail, setUserEmail] = useState('');

  const logout = () => {
    setEmail('');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
  };

  const getUserData = () => {
    let localStorageUser = { email: 'Sem e-mail cadastrado.' };
    if (localStorage.getItem('user')) {
      localStorageUser = JSON.parse(localStorage.getItem('user'));
    }
    setUserEmail(localStorageUser.email);
  };

  useEffect(() => {
    setTitle('Perfil');
    getUserData();
  }, []);

  return (
    <div className="profile-container">
      <h1
        data-testid="profile-email"
        className="profile-email"
      >
        { userEmail }
      </h1>
      <Link className="profile-btn-link" to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn" className="profile-btn-option">
          Receitas Feitas
        </button>
      </Link>
      <Link className="profile-btn-link" to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn" className="profile-btn-option">
          Receitas Favoritas
        </button>
      </Link>
      <Link className="profile-btn-link" to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
          className="profile-btn-option"
        >
          Sair
        </button>
      </Link>
    </div>
  );
};

export default Profile;
