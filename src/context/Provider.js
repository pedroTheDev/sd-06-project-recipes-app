import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function RecipesAppProvider({ children }) {
  const [estadoTeste, setEstadoTeste] = useState('teste');

  const contextValue = {
    estadoTeste,
    setEstadoTeste,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

RecipesAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesAppProvider;
