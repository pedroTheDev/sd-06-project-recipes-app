import React from 'react';
import { Link } from 'react-router-dom';
import perfil from '../images/profileIcon.svg';

export default function HeaderNoSearch() {
  return (
    <div>
      <div>
        <Link to="/perfil">
          <button type="button" src={ perfil }>
            <img
              src={ perfil }
              alt="perfil"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      </div>
      <div>
        <span data-testid="page-title">{ document.title }</span>
      </div>
    </div>
  );
}
