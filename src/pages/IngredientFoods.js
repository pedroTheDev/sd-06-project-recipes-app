import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const IngredientFoods = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar Ingredientes');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default IngredientFoods;
