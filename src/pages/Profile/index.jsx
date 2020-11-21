import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { useAuth } from '../../hooks/auth';

function Profile() {
  const { user, signOut } = useAuth();

  const { push } = useHistory();

  const handleLogOut = useCallback(() => {
    signOut();

    push('/');
  }, [signOut, push]);

  return (
    <div className="profile-page">
      <Header pageName="Perfil" />

      <h3 data-testid="profile-email">{user.email}</h3>

      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas Feitas
      </Link>

      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </Link>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={handleLogOut}
      >
        Sair
      </button>

      <Navbar />
    </div>
  );
}

export default Profile;
