import React, { useContext, useState } from 'react';
import ContextAPI from '../../Context/ContextAPI';

import { searchFoodIngredients, searchFoodName, searchFoodFirstLetter } from '../../services/aPI';

const SearchBar = () => {
  const { searchComponent, setApiValueSearch, apiValueSearch } = useContext(ContextAPI);
  const [nome, setNome] = useState('');
  const [radioButton, setRadioButton] = useState('');

  const handleChange = (target) => {
    if (target.name === 'radio-button') setRadioButton(target.value);

    if (target.name === 'text') setNome(target.value);
  };

  const apiOfIngredients = async () => {
    const results = await searchFoodIngredients(nome);
    // console.log(results);
    setApiValueSearch({
      results,
    });
  };

  const apiOfName = async () => {
    const results = await searchFoodName(nome);
    console.log(results);
    setApiValueSearch({
      results,
    });
  };

  const apiOfFirstLetter = async () => {
    const results = await searchFoodFirstLetter(nome);
    console.log(results);
    setApiValueSearch({
      results,
    });
  };

  const handleChangeButton = () => {
    switch (radioButton) {
      case 'ingrediente':
        return apiOfIngredients();
      case 'nome':
        return apiOfName();
      case 'primeira-letra':
        return apiOfFirstLetter();
      default:
        return alert('error');
    }
  };

  return searchComponent && (
    <div id="search-bar">
      <input data-testid="search-input" name="text" type="text" onChange={(e) => handleChange(e.target)} />
      <br />
      <input type="radio" data-testid="ingredient-search-radio" id="ingrediente-button" name="radio-button" value="ingrediente" onChange={(e) => handleChange(e.target)} />
      <label htmlFor="ingrediente-button">Ingrediente</label>
      <input type="radio" data-testid="name-search-radio" id="nome-button" name="radio-button" value="nome" onChange={(e) => handleChange(e.target)} />
      <label htmlFor="nome-button">Nome</label>
      <input type="radio" data-testid="first-letter-search-radio" id="primeira-letra" name="radio-button" value="primeira-letra" onChange={(e) => handleChange(e.target)} />
      <label htmlFor="primeira-letra">Primeira Letra</label>
      <br />
      <button type="button" onClick={handleChangeButton} data-testid="exec-search-btn">Buscar</button>
    </div>
  );
};

export default SearchBar;
