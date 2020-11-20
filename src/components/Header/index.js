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
      case '/explorar':
        return setState({
          namePage: 'Explorar',
          search: true,
        });
      case '/explorar/comidas':
        return setState({
          namePage: 'Explorar Comidas',
          search: true,
        });
      case '/explorar/bebidas':
        return setState({
          namePage: 'Explorar Bebidas',
          search: true,
        });
      case '/explorar/comidas/ingredientes':
      return setState({
        namePage: 'Explorar Ingrediente ',
        search: true,
      });
      case '/explorar/comidas/area':
      return setState({
        namePage: 'Explorar Origem',
        search: true,
      });
      case '/receitas-feitas':
      return setState({
        namePage: 'Receitas Feitas',
        search: true,
      });
      case '/receitas-favoritas':
        return setState({
          namePage: 'Receitas Favoritas',
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
          data-testid="profile-top-btn"
          src={profileIcon}
          alt="profileIcon"
        />
      </Link>
      <div>
        {
          !state ? <h2>Title</h2> : <h2 data-testid="page-title">{state.namePage}</h2>
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
