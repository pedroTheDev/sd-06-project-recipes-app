import React, { Component } from 'react';
import { searchIcon } from '../images';

export default class BtnSearchBar extends Component {
  constructor(){
    super();
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.state = {
      searchBar: false,
    }
  }
  
  handleSearchBar() {
    this.setState(prevState => ({
      searchBar: !prevState.searchBar
    }));
  }
  render() {
    return (
      <button type="button" data-testid="search-top-btn" onClick={ this.handleSearchBar } >
        <img alt="ícone de Pesquisa" src={ searchIcon } />
      </button>
    )
  }
}
