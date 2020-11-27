import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Header from '../Components/Header';

export default function ReceitasFeitas() {
  const { titulo, setTitulo } = useContext(Context);

  useEffect(() => {
    setTitulo('Receitas Feitas');
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </div>
  );
}
