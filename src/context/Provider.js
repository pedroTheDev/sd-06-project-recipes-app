import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');

  const contextValue = {
    email,
    setEmail,
    titulo,
    setTitulo,
  };

  return (
    <Context.Provider value={contextValue}>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
