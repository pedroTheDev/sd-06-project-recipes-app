import React from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';

function ExplorarComidas() {
  const history = useHistory();

  function redirectExplorarIngredientes() {
    history.push('/explorar/comidas/ingredientes');
  }
  function redirectExplorarOrigem() {
    history.push('/explorar/comidas/area');
  }
  return (
    <div>
      <Header2 title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ redirectExplorarIngredientes }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ redirectExplorarOrigem }
      >
        Por Local de Origem
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

export default ExplorarComidas;
