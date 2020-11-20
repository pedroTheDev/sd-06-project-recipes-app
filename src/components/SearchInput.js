import React from 'react';
import { fetchDrinks, fetchMeal } from '../services/index';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      radio: '',
      meals: [],
      drinks: [],
    };
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.clickApi = this.clickApi.bind(this);
    this.redirectFromState = this.redirectFromState.bind(this);
  }

  componentDidUpdate() {
    this.redirectFromState();
  }

  redirectFromState() {
    const { meals, drinks } = this.state;
    const { history } = this.props;
    if (meals.length === 1) {
      history.push(`/comidas/${meals.idMeal}`);
    }
    else if (drinks.length === 1) {
      history.push(`/comidas/${drinks.idDrink}`);
    }
  }

  async clickApi() {
    const { history: { location: { pathname } } } = this.props;
    const { search, radio } = this.state;
    if (pathname === '/comidas') {
      if (radio === 'primeira-letra' && search.length > 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const responseApi = await fetchMeal(search, radio);
        this.setState({
          meals: responseApi,
        });
      }
    }
    if (pathname === '/bebidas') {
      if (radio === 'primeira-letra' && search.length > 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const responseApi = await fetchDrinks(search, radio);
        this.setState({
          drinks: responseApi,
        });
      }
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
              data-testid="name-search-radio"
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
          <button
            type="button"
            onClick={ this.clickApi }
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

export default SearchInput;
