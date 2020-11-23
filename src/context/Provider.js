import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const contextValue = {
    email,
    setEmail,
    titulo,
    setTitulo,
    meals,
    setMeals,
    drinks,
    setDrinks,
    loading,
    setLoading,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
