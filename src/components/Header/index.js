import React, { useState, useEffect } from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = () => {
  const [state, setState] = useState({
    namePage: '',
    search: '',
  });

  const changeHeader = () => {
    switch (window.location.pathname) {
      case '/perfil':
        return setState({
          namePage: 'Perfil',
          search: false,
        });
      case '/comidas':
        return setState({
          namePage: 'Comidas',
          search: true,
        });
      case '/bebidas':
        return setState({
          namePage: 'Bebidas',
          search: true,
        });
      case '':
        return setState({
          namePage: '',
          search: true,
        });
      case '':
        return setState({
          namePage: '',
          search: true,
        });
      default:
        return '';
    }
  };

  useEffect(() => {
    changeHeader();
  }, []);

  return (
    <header className="header">
      <Link to="/perfil">
        <img
          date-testid="profile-top-btn"
          src={profileIcon}
          alt="profileIcon"
        />
      </Link>
      <div>
        {
          !state ? <h2>Não existe</h2> : <h2>{state.namePage}</h2>
        }
      </div>
      {!state.search ? <div />
        : (
          <Link to="/">
            <img
              date-testid="search-top-btn"
              src={searchIcon}
              alt="searchIcon"
            />
          </Link>
        )}
    </header>
  );
};

export default Header;
