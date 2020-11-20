import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function FavoritesRecipes() {
  const { setHeader } = useContext(AppContext);
  useEffect(() => {
    setHeader({ page: 'Receitas Favoritas', search: false });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoritesRecipes;
