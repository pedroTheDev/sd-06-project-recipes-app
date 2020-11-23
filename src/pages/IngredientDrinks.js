import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const IngredientDrinks = () => {
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

export default IngredientDrinks;
