import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RevenueContext from '../context/RevenueContext';

export default function Profile(props) {
  const { title } = props;
  const { email } = useContext(RevenueContext);
  return (
    <div>
      <Header title={ title } />
      <span data-testid="profile-email">
        {email}
      </span>
      <div>
        <Link to="receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
          >
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string.isRequired,
};
