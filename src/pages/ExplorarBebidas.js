import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';

function ExplorarBebidas() {
  const history = useHistory();

  function redirectExplorarIngredientes() {
    history.push('/explorar/bebidas/ingredientes');
  }
  // function redirectExplorarBebidas() {
  //   history.push('/explorar/bebidas');
  // }
  return (
    <div>
      <Header2 title="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ redirectExplorarIngredientes }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <MenuInferior />
    </div>
  );
}

export default ExplorarBebidas;
