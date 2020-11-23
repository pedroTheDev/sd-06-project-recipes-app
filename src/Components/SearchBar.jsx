import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import * as api from '../services/Api';

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const { setMeals, setDrinks, setLoading, titulo } = useContext(Context);

  const handleChange = ({ target }) => {
    setSearchParam(target.value);
  };

  const buscaComidas = async () => {
    if (searchParam === 'ingredient') {
      setLoading(true);
      const filteredMeals = await api.fetchFoodByIngredients(termoBusca);
      setMeals(filteredMeals);
      setLoading(false);
    }
    if (searchParam === 'name') {
      setLoading(true);
      const filteredMeals = await api.fetchFoodByName(termoBusca);
      setMeals(filteredMeals);
      setLoading(false);
    }
    if (termoBusca.length === 1 && searchParam === 'first-letter') {
      setLoading(true);
      const filteredMeals = await api.fetchFoodByFirstLetter(termoBusca);
      setMeals(filteredMeals);
      setLoading(false);
    } else if (searchParam === 'first-letter' && termoBusca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const buscaBebidas = async () => {
    if (searchParam === 'ingredient') {
      setLoading(true);
      const filteredDrinks = await api.fetchDrinkByIngredients(termoBusca);
      setDrinks(filteredDrinks);
      setLoading(false);
    }
    if (searchParam === 'name') {
      setLoading(true);
      const filteredDrink = await api.fetchDrinkByName(termoBusca);
      setDrinks(filteredDrink);
      setLoading(false);
    }
    if (termoBusca.length === 1 && searchParam === 'first-letter') {
      setLoading(true);
      const filteredDrink = await api.fetchDrinkByFirstLetter(termoBusca);
      setDrinks(filteredDrink);
      setLoading(false);
    } else if (searchParam === 'first-letter' && termoBusca.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const onClick = () => {
    if (titulo === 'Comidas') {
      buscaComidas();
    }
    if (titulo === 'Bebidas') {
      buscaBebidas();
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={ termoBusca }
        data-testid="search-input"
        onChange={ (evento) => setTermoBusca(evento.target.value) }
      />
      <input
        type="radio"
        name="search"
        data-testid="ingredient-search-radio"
        value="ingredient"
        onChange={ handleChange }
      />
      Ingrediente
      <input
        type="radio"
        name="search"
        data-testid="name-search-radio"
        value="name"
        onChange={ handleChange }
      />
      Nome
      <input
        type="radio"
        name="search"
        data-testid="first-letter-search-radio"
        value="first-letter"
        onChange={ handleChange }
      />
      Primeira letra
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onClick }
      >
        Busca
      </button>
    </div>
  );
}
