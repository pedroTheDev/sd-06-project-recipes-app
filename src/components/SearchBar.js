import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="searchBar">
        <input data-testid="search-input" type="text" />
        <label htmlfor="ingredient">
          <input data-testid="ingredient-search-radio" type="radio" id="ingredient" name="gender" value="ingredient" />
          Ingrediente
        </label>
        <label htmlfor="name">
          <input data-testid="name-search-radio" type="radio" id="name" name="gender" value="name" />
          Nome
        </label>
        <label htmlfor="firstLetter">
          <input data-testid="first-letter-search-radio" type="radio" id="other" name="gender" value="firstLetter" />
          Primeira Letra
        </label>
        <button data-testid="exec-search-btn" type="button">Buscar</button>
      </div>
    )
  }
}
