import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import HeaderContext from '../context/HeaderContext';

function Food() {
  const { setHeader } = useContext(HeaderContext);
  useEffect(() => {
    setHeader([true, 'Comidas', true]);
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Food;
