import React, { useContext } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import RecipesContext from '../context/Context';

export default function Drinks() {
  document.title = 'Bebidas';
  const { items } = useContext(RecipesContext);

  function handleAlert() {
    if (items.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div>
      <Header id="bebidas" />
      <Cards id="bebidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}
