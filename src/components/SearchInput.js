import React from 'react';
import fetchMeal from '../services/FetchAPI';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.searchHandleClick = this.searchHandleClick.bind(this);
    this.searchHandleChange = this.searchHandleChange.bind(this);
    this.getMeals = this.getMeals.bind(this);
  }

  getMeals(meals) {
    this.setState({
      meals,
    });
  }

  async searchHandleClick({ target }) {
    const { id } = target;
    const { search } = this.state;
    const responseApi = await fetchMeal(search, id);
    this.getMeals(responseApi);
  }

  searchHandleChange({ target }) {
    this.setState({
      search: target.value,
    });
  }

  render() {
    const { meals } = this.state;
    console.log(meals);
    return (
      <div className="toogle-search-input">
        <input data-testid="search-input" onChange={ this.searchHandleChange } />
        <div className="radio-input-div">
          <label htmlFor="ingrediente">
            <input
              data-testid="ingredient-search-radio"
              id="ingrediente"
              type="radio"
              name="search-filter"
              onClick={ this.searchHandleClick }
            />
            Ingrediente
          </label>
          <label htmlFor="nome">
            <input
              id="nome"
              type="radio"
              name="search-filter"
              onClick={ this.searchHandleClick }
            />
            Nome
          </label>
          <label htmlFor="primeira-letra">
            <input
              data-testid="first-letter-search-radio"
              id="primeira-letra"
              type="radio"
              name="search-filter"
              onClick={ this.searchHandleClick }
            />
            Primeira Letra
          </label>
        </div>
      </div>
    );
  }
}

export default SearchInput;
