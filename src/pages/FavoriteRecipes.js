import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const FavoriteRecipes = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Receitas Favoritas');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default FavoriteRecipes;
