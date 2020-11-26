import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import FetchApiComidas, { fetchApiComidasCategorias } from '../services/FetchApiComidas';
import FetchApiBebidas, { fetchApiBebidasCategorias } from '../services/FetchApiBebidas';

function Provider({ children }) {
  const [categoriesComida, setCategoriesComida] = useState([]);
  const [categoriesBebida, setCategoriesBebida] = useState([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [valueRadioButton, setValueRadioButton] = useState('');
  const [searchBar, setSearchBar] = useState('');
  const [retornoApiComidas, setRetornoApiComidas] = useState([]);
  const [retornoApiBebidas, setRetornoApiBebidas] = useState([]);
  const [retornoApi6Comidas, setRetornoApi6Comidas] = useState([]);
  const [idBebida, setIdBebida] = useState('');
  const [idComida, setIdComida] = useState('');

  const fetchComida = async () => {
    const response = await FetchApiComidas('1', '');
    setRetornoApiComidas(response);
  };
  const fetch6Comida = async () => {
    const response = await FetchApiComidas('2', '');
    setRetornoApi6Comidas(response);
  };

  const fetchCategoriesComidas = async () => {
    const response = await fetchApiComidasCategorias();
    setCategoriesComida(response);
  };

  const fetchBebida = async () => {
    const response = await FetchApiBebidas('2', '');
    setRetornoApiBebidas(response);
  };

  const fetchCategoriesBebidas = async () => {
    const response = await fetchApiBebidasCategorias();
    setCategoriesBebida(response);
  };

  useEffect(() => {
    fetchCategoriesComidas();
    fetchComida();
    fetchCategoriesBebidas();
    fetchBebida();
    fetch6Comida();
  }, []);

  const contextValue = {
    categoriesComida,
    setCategoriesComida,
    categoriesBebida,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    valueRadioButton,
    setValueRadioButton,
    searchBar,
    setSearchBar,
    retornoApiComidas,
    setRetornoApiComidas,
    retornoApiBebidas,
    setRetornoApiBebidas,
    idBebida,
    setIdBebida,
    idComida,
    setIdComida,
    retornoApi6Comidas,
    setRetornoApi6Comidas,
  };
  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
