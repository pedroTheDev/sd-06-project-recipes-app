import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const Drinks = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Bebidas');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default Drinks;
