import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const ExploreDrinks = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar Bebidas');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default ExploreDrinks;
