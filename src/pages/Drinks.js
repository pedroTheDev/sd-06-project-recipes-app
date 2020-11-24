import React, { useContext, useEffect } from 'react';
import { Header, Cards, Footer, Categories } from '../components';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';

export default function Drinks() {
  document.title = 'Bebidas';
  const { items, filters, setFilters } = useContext(RecipesContext);
  useEffect(() => {
    if (filters.category === '') {
      setFilters({ ...filters, category: 'bebidas' });
    }
  });
  useSearch();

  function handleAlert() {
    if (items.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="bebidas" />
      <Categories id="bebidas" />
      <Cards id="bebidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}
