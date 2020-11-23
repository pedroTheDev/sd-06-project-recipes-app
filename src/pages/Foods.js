import React, { useEffect, useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

const Foods = () => {
  const { title, setTitle } = useContext(HeaderContext);

  useEffect(() => {
    setTitle('Comidas');
  }, []);

  return (
    <h1>
      { title }
    </h1>
  );
};

export default Foods;
