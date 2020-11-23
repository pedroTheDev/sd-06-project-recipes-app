import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import useSearch from '../hooks/useSearch';

export default function Foods() {
  document.title = 'Comidas';
  const { items } = useContext(Context);
  useSearch();

  function handleAlert() {
    if (items.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="comidas" />
      <Cards id="comidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}
