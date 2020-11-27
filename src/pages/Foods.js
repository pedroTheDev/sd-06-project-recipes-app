import React, { useContext, useEffect } from 'react';
import { Cards, Footer, Header, Categories } from '../components';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';

export default function Foods() {
  document.title = 'Comidas';
  const { items, filters } = useContext(RecipesContext);
  const [setFilters] = useSearch();
  useEffect(() => {
    if (filters.category === '') {
      setFilters({ ...filters, category: 'comidas' });
    }
  });

  function handleAlert() {
    if (items.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="comidas" />
      <Categories id="comidas" />
      <Cards id="comidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}
