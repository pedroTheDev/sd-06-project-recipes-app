import React, { useContext, useState } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';
import { requestApiFoodFilterIngredient, requestApiFoodFilterName, requestApiFoodFilterFirstLetter} from '../services/requestFood';

function HeaderSearch() {
  const { contextValue: { searchHeader } } = useContext(RecipesAppContext);
  const [ radioValue, setRadioValue ] = useState('');
  const [ textSearch, setTextSearch ] = useState('');

  const searchFood = () => {
    if (radioValue === 'ingredientes') {
      requestApiFoodFilterIngredient(textSearch);
    } else if (radioValue === 'nome') {
      requestApiFoodFilterName(textSearch);
    } else if (radioValue === 'primeira-letra' && textSearch.length === 1) {
      requestApiFoodFilterFirstLetter(textSearch);
    } else {
      alert('Sua busca deve conter somente 1 (um) caracter')
    }
  }

  const captureValue = (e) => {
    setRadioValue(e.target.value)
  }

  const captureTextInput = (e) => {
    setTextSearch(e.target.value)
  }

  if ( !searchHeader ) {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div>
        <input type="text" data-testid="search-input" onChange={ captureTextInput } />
        <input 
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredientes"
          name="busca"
          value="ingredientes"
          onChange={captureValue}
         />
        <label htmlFor="ingredientes">Ingredientes</label>
        <input
          data-testid="name-search-radio"
          type="radio"
          id="nome"
          name="busca"
          value="nome"
          onChange={captureValue}
         />
        <label htmlFor="nome">Nome</label>
        <input 
          data-testid="first-letter-search-radio"
          type="radio"
          id="primeira-letra"
          name="busca"
          value="primeira-letra"
          onChange={captureValue}
        />
        <label htmlFor="primeira-letra">Primeira Letra</label>
        <button type="button" data-testid="exec-search-btn" onClick={ searchFood }>Buscar</button>
      </div>
    )
  }
}

export default HeaderSearch;
