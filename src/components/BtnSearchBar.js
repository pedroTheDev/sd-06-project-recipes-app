import React, { Component } from 'react';
import { searchIcon } from '../images';

export default class BtnSearchBar extends Component {
  render() {
    return (
      <button type="button" data-testid="search-top-btn" onClick={ this.handleSearchBar } >
        <img alt="ícone de Pesquisa" src={ searchIcon } />
      </button>
    )
  }
}
