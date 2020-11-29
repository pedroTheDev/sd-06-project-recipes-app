import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardComidaRecomendacao from '../components/CardComidaRecomendacao';
import RecipeContext from '../context/RecipeContext';
import { fetchApiBebidasDetalhes } from '../services/FetchApiBebidas';
import '../components/MenuInferior.css';

function DetalhesBebida() {
  const { idDaReceita } = useParams();
  const [estadoApiBebidas, setEstadoApiBebidas] = useState([]);
  const {
    retornoApi6Comidas,
    iniciarReceitas,
    setIniciarReceitas,
    // receitasTerminadas,
  } = useContext(RecipeContext);

  const seis = 6;
  const zero = 0;
  const fetchBebidasDetalhes = async () => {
    const response = await fetchApiBebidasDetalhes(idDaReceita);
    setEstadoApiBebidas(response);
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
    history.push(`/bebidas/${idDaReceita}/in-progress`);
  }

  useEffect(() => {
    fetchBebidasDetalhes();
  }, []);

  const quinze = 15;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= quinze; numero += 1) {
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
    estadoApiBebidas.map((bebida, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ bebida.strDrinkThumb }
          alt={ bebida.strDrink }
        />
        <h4 data-testid="recipe-title">{ bebida.strDrink }</h4>
        <h6 data-testid="recipe-category">{bebida.strAlcoholic}</h6>
        <div>
          {renderIngrediente(bebida)}
        </div>
        <p data-testid="instructions">{bebida.strInstructions}</p>
        {/* <button
          type="button"
          data-testid={ `${index}-recomendation-card` }
        >
          Card receitas Recomendadas
        </button> */}
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>

        <div className="recomendacao">
          {
            retornoApi6Comidas
            && retornoApi6Comidas.slice(zero, seis)
              .map((food, indice) => (
                <button
                  data-testid={ `${indice}-recomendation-card` }
                  type="button"
                  key={ indice }
                  className="img-recomendacao"
                >
                  {CardComidaRecomendacao(food, indice)}
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
        {/* { receitasTerminadas
          .includes(!idDaReceita)
          ? (
            <button
              data-testid="start-recipe-btn"
              className="IniciarReceita"
              type="button"
              id="IniciarReceita"
              onClick={ handleIniciarReceita }
            >
              {iniciarReceitas
                .includes(idDaReceita)
                ? <span>Continuar Receita</span> : 'Iniciar Receita'}

            </button>) : ''} */}
      </div>
    )));
}

export default DetalhesBebida;
