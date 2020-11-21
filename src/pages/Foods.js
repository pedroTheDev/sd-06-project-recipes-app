import React, { useContext } from 'react';
import Cards from '../components/Cards';
import Header from '../components/Header';
import Context from '../context/Context';

export default function Foods() {
  document.title = 'Comidas';
  const { items } = useContext(Context);

  function handleAlert() {
    if (items.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="comidas" />
      <Cards />
      {items ? handleAlert() : null}
    </div>
  );
}
