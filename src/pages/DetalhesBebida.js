import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import { fetchApiBebidasDetalhes } from '../services/FetchApiBebidas';

function DetalhesBebida() {
  const { idBebida } = useContext(RecipeContext);
  const [estadoApiBebidas, setEstadoApiBebidas] = useState([]);
  const fetchBebidasDetalhes = async () => {
    const response = await fetchApiBebidasDetalhes(idBebida);
    setEstadoApiBebidas(response);
    console.log(response);
    console.log(estadoApiBebidas[0]);
  };

  useEffect(() => {
    fetchBebidasDetalhes();
  }, []);
  return (

    <div>
      <img
        data-testid="recipe-photo"
        src={ estadoApiBebidas[0].strDrinkThumb }
        alt={ estadoApiBebidas[0].strDrink }
      />
      <h4 data-testid="recipe-title">{ estadoApiBebidas[0].strDrink }</h4>
      <h6 data-testid="recipe-category">Categoria</h6>
      <p data-testid={ `${estadoApiBebidas[0]}-ingredient-name-and-measure` }>Ingredientes</p>
      <p data-testid="instructions">Instruções</p>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>

    </div>
  );
}

export default DetalhesBebida;
