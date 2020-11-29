import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardBebidaRecomendacao from '../components/CardBebidaRecomendacao';
import RecipeContext from '../context/RecipeContext';
import { fetchApiComidasDetalhes } from '../services/FetchApiComidas';
import '../components/MenuInferior.css';

function DetalhesComidas() {
  const { idDaReceita } = useParams();
  const [estadoApiComidas, setEstadoApiComidas] = useState([]);
  const {
    retornoApi6Bebidas,
    iniciarReceitas,
    setIniciarReceitas,
    // receitasTerminadas,
  } = useContext(RecipeContext);

  const seis = 6;
  const zero = 0;
  const fetchComidasDetalhes = async () => {
    const response = await fetchApiComidasDetalhes(idDaReceita);
    setEstadoApiComidas(response);
  };
  function mudaNomeButton() {
    if (iniciarReceitas.includes(idDaReceita)) {
      document.getElementById('IniciarReceita').innerText = 'Continuar Receita';
    }
  }
  const history = useHistory();
  function handleIniciarReceita() {
    setIniciarReceitas([...iniciarReceitas, idDaReceita]);
    console.log(idDaReceita);
    mudaNomeButton();
    history.push(`/comidas/${idDaReceita}/in-progress`);
  }
  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

  const vinte = 20;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= vinte; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== null) {
        array.push(
          <p data-testid={ `${numero - 1}-ingredient-name-and-measure` }>
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== null)
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}
          </p>,
        );
      }
    }
    return array;
  }

  return (
    estadoApiComidas.map((comida, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ comida.strMealThumb }
          alt={ comida.strMeal }
        />
        <h2 data-testid="recipe-title">{ comida.strMeal }</h2>
        <h3 data-testid="recipe-category">{comida.strCategory}</h3>
        <div>
          {renderIngrediente(comida)}
        </div>
        <p data-testid="instructions">{comida.strInstructions}</p>

        <video
          controls
          data-testid="video"
          src={ comida.strYoutube }
        >
          <track
            default
            kind="captions"
            srcLang="en"
            src={ comida.strYoutube }
          />
        </video>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>

        <div className="recomendacao">
          {
            retornoApi6Bebidas
            && retornoApi6Bebidas.slice(zero, seis)
              .map((drink, indice) => (
                <button
                  data-testid={ `${indice}-recomendation-card` }
                  className="img-recomendacao"
                  key={ indice }
                  type="button"
                >
                  {CardBebidaRecomendacao(drink, indice)}
                </button>))
          }
        </div>
        <button
          data-testid="start-recipe-btn"
          className="IniciarReceita"
          type="button"
          id="IniciarReceita"
          onClick={ handleIniciarReceita }
        >
          Iniciar Receita

        </button>

      </div>
    )));
}

export default DetalhesComidas;
