import React, { useContext } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import RecipeContext from '../context/RecipeContext';
import CardBebida from '../components/CardBebida';

function Bebidas() {
  const { retornoApiBebidas } = useContext(RecipeContext);
  const doze = 12;
  return (
    <div>
      <Header title="Bebidas" />
      {
        retornoApiBebidas ? retornoApiBebidas.map((bebida, index) => {
          if (index < doze) {
            return CardBebida(bebida, index);
          }
          return undefined;
        }) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
      <MenuInferior />
    </div>
  );
}

export default Bebidas;
