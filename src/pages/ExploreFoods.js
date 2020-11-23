import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const ExploreFoods = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar Comidas');
  }, []);
  
  return (
    <h1>
      { title }
    </h1>
  );
}

export default ExploreFoods;
