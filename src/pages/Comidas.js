import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import CardComida from '../components/CardComida';

function Comidas() {
  const { retornoApiComidas } = useContext(RecipeContext);
  const doze = 12;

  return (
    <div>
      <Header title="Comidas" />
      {
        retornoApiComidas ? retornoApiComidas.map((comida, index) => {
          if (index < doze) {
            return CardComida(comida, index);
          }
          return undefined;
        }) : alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      }
    </div>
  );
}

export default Comidas;
