import React, { useContext } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Context from '../context/Context';
import Footer from '../components/Footer';

export default function Drinks() {
  document.title = 'Drinks';
  const { items } = useContext(Context);

  function handleAlert() {
    if (items.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="bebidas" />
      <Cards />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}
