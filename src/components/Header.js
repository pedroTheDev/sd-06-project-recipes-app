import React, { Component } from 'react';
import propTypes from 'prop-types';
import SearchBar from './SearchBar';
// import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { className, iconPerfil, pageTitle, iconSearch } = this.props;
    return (
      <header
        name="header"
        className={ className }
      >
        {/* <Link to="/perfil"> */}
          <button type="button" data-testid="profile-top-btn">
            <img alt="Ícone de Perfil" src={ iconPerfil } />
          </button>
        {/* </Link> */}
        <h1 data-testid="page-title">{ pageTitle }</h1>
        <SearchBar />
        <button type="button" data-testid="search-top-btn">
          <img alt="ícone de Pesquisa" src={ iconSearch } />
        </button>
      </header>
    )
  }
}

Header.propTypes = {
  className: propTypes.string.isRequired,
  iconPerfil: propTypes.string,
  pageTitle: propTypes.string,
  iconPage: propTypes.string,
};
