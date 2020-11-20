import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function ExploreFoodIngredients() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Explorar Ingredientes', search: false });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default ExploreFoodIngredients;
