import React, { useContext, useEffect } from 'react';
import { Header, Cards, Footer, Categories } from '../components';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';

export default function Drinks() {
  document.title = 'Bebidas';
  const { items, setItems, filters } = useContext(RecipesContext);
  const [setFilters] = useSearch();
  useEffect(() => {
    if (filters.category === '') {
      setFilters({ ...filters, category: 'bebidas' });
    }

    return () => setItems(undefined);
  }, []);

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
