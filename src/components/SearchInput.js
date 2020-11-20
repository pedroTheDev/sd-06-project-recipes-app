import React from 'react';
import fetchMeal from '../services/FetchAPI';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      radio: '',
    };
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.getMeals = this.getMeals.bind(this);
    this.clickApi = this.clickApi.bind(this);
  }

  getMeals(meals) {
    this.setState({
      meals,
    });
  }

  async clickApi() {
    const { search, radio } = this.state;
    if (radio === 'primeira-letra' && search.length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      const responseApi = await fetchMeal(search, radio);
      this.getMeals(responseApi);
    }
  }

  searchHandleChange(event, name) {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="toogle-search-input">
        <input
          data-testid="search-input"
          onChange={ (event) => this.searchHandleChange(event, 'search') }
        />
        <div className="radio-input-div">
          <label htmlFor="ingrediente">
            <input
              data-testid="ingredient-search-radio"
              id="ingrediente"
              type="radio"
              name="search-filter"
              value="ingrediente"
              onChange={ (event) => this.searchHandleChange(event, 'radio') }
            />
            Ingrediente
          </label>
          <label htmlFor="nome">
            <input
              id="nome"
              type="radio"
              name="search-filter"
              value="nome"
              onChange={ (event) => this.searchHandleChange(event, 'radio') }
            />
            Nome
          </label>
          <label htmlFor="primeira-letra">
            <input
              data-testid="first-letter-search-radio"
              id="primeira-letra"
              type="radio"
              name="search-filter"
              value="primeira-letra"
              onChange={ (event) => this.searchHandleChange(event, 'radio') }
            />
            Primeira Letra
          </label>
          <button type="button" onClick={ this.clickApi }>Buscar</button>
        </div>
      </div>
    );
  }
}

export default SearchInput;
