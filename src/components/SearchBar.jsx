import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getMeals from '../services/theMealApi';
import getCockTail from '../services/theCockTailApi';

class SearchRadio extends Component {
  constructor() {
    super();

    this.requestFromApi = this.requestFromApi.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = { inputRadio: '' };
  }

  handleInput({ target: { name, id } }) {
    this.setState({ [name]: id });
  }

  async requestFromApi() {
    const { searchInput, title } = this.props;
    const { inputRadio } = this.state;

    if (inputRadio === 'primeira-letra' && searchInput.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const inputValue = {
      ingrediente: 'filter.php?i',
      nome: 'search.php?s',
      'primeira-letra': 'search.php?f',
    };

    let meals = [];
    const endPointString = `${inputValue[inputRadio]}=${searchInput}`;

    if (title === 'Comidas') {
      meals = await getMeals(endPointString);
    }
    if (title === 'Bebidas') {
      meals = await getCockTail(endPointString);
    }

    if (!meals[0]) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="ingrediente">
          <input
            name="inputRadio"
            id="ingrediente"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ this.handleInput }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            name="inputRadio"
            id="nome"
            type="radio"
            data-testid="name-search-radio"
            placeholder="Nome"
            onChange={ this.handleInput }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            name="inputRadio"
            id="primeira-letra"
            type="radio"
            data-testid="first-letter-search-radio"
            placeholder="Primeira Letra"
            onChange={ this.handleInput }
          />
          Primeira letra
        </label>
        <button
          type="button"
          onClick={ this.requestFromApi }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchRadio.propTypes = {
  searchInput: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchRadio;
