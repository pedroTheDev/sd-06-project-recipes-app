import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

export default function Header(props) {
  const { title } = props;
  const search = (
    (title === 'Comidas' || title === 'Bebidas'
      ? (
        <form>
          <input
            type="text"
            name="search"
            className="inputSearch"
            data-testid="search-top-btn"
          />
        </form>
      )
      : (null)
    ));

  return (
    <div className="header">
      <Link to="/perfil" data-testid="profile-top-btn" src={ profileIcon }>
        <img src={ profileIcon } alt="profile" className="perfil-icon" />
      </Link>
      <h2 className="header-title" data-testid="page-title">{ title }</h2>
      {search}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
