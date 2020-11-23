import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const DoneRecipes = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Receitas Feitas');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default DoneRecipes;
