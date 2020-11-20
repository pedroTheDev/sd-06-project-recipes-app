import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function FinishedRecipes() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Receitas Feitas', search: false });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default FinishedRecipes;
