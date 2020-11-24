import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMealAPI, fetchDrinkAPI } from '../services/foodAPI';
import { saveFoodSearch, saveDrinksSearch } from '../redux/actions';

function SearchBar({ page, dispatchSaveFood, dispatchSaveDrinks, closeBar, display }) {
  const [searchInput, setSearchInput] = useState('');
  const [option, setOption] = useState('');

  async function pageCheckSwitch(pageName) {
    if (pageName === 'Bebidas') {
      const API_RESPONSE = await fetchDrinkAPI(option, searchInput);
      dispatchSaveDrinks(API_RESPONSE);
      closeBar(!display);
    } else {
      const API_RESPONSE = await fetchMealAPI(option, searchInput);
      dispatchSaveFood(API_RESPONSE);
      closeBar(!display);
    }
  }

  function handleButtonClick() {
    if (!searchInput || !option) {
      return alert('Please select an option or input some search parameter');
    } if (option === 'first-letter' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    pageCheckSwitch(page);

    return null;
  }

  return (
    <div className="search-bar">
      <div className="search-bar-inner-border">
        <input
          onChange={ (event) => setSearchInput(event.target.value) }
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          className="search-inner-element"
        />
        <div className="radio-section">
          <label htmlFor="search-ingredient" className="search-inner-element">
            <input
              name="search-radio"
              type="radio"
              id="search-ingredient"
              data-testid="ingredient-search-radio"
              onClick={ (event) => setOption(event.nativeEvent.target.id) }
            />
            Ingrediente
          </label>
          <label htmlFor="search-name" className="search-inner-element">
            <input
              name="search-radio"
              type="radio"
              id="search-name"
              data-testid="name-search-radio"
              onClick={ (event) => setOption(event.nativeEvent.target.id) }
            />
            Nome
          </label>
          <label htmlFor="first-letter" className="search-inner-element">
            <input
              name="search-radio"
              type="radio"
              id="first-letter"
              data-testid="first-letter-search-radio"
              onClick={ (event) => setOption(event.nativeEvent.target.id) }
            />
            Primeira letra
          </label>
        </div>
        <button
          className="search-inner-element"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleButtonClick }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
  dispatchSaveFood: PropTypes.func.isRequired,
  dispatchSaveDrinks: PropTypes.func.isRequired,
  closeBar: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveFood: (payload) => dispatch(saveFoodSearch(payload)),
  dispatchSaveDrinks: (payload) => dispatch(saveDrinksSearch(payload)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
