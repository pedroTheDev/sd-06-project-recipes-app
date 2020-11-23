import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

const OriginFoods = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Explorar Origem');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default OriginFoods;
