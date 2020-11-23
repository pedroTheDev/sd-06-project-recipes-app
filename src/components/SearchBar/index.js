import React, { useContext, useState } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const SearchBar = () => {
  const { searchComponent, setApiValueSearch } = useContext(ContextAPI);
  const [nome, setNome] = useState('');
  const [radioButton, setRadioButton] = useState('');

  const handleChange = (target) => {
    if (target.name === 'radio-button') setRadioButton(target.value);

    if (target.name === 'text') setNome(target.value);
  };

  const setValuesApi = () => {
    const value = [nome];
    value.push(radioButton);
    setApiValueSearch(value);
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
      <button type="button" onClick={() => setValuesApi()} data-testid="exec-search-btn">Buscar</button>
    </div>
  );
};
export default SearchBar;
