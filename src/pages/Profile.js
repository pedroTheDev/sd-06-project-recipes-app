import React from 'react';

function Profile() {
  return (
    <div>
      <div
        data-testid="profile-email"
      >
        Email
      </div>
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
  );
}

export default Profile;
