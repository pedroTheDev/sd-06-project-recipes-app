import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import HeaderContext from '../context/HeaderContext';

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
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    setUserEmail(localStorageUser.email);
  };

  useEffect(() => {
    setTitle('Perfil');
    getUserData();
  }, []);

  return (
    <div>
      <h1 data-testid="profile-email">{ userEmail }</h1>
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
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </button>
      </Link>
    </div>
  );
};

export default Profile;
