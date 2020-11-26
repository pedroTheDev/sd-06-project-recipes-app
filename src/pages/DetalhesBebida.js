import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
    receitasTerminadas,
    setReceitasTerminadas } = useContext(RecipeContext);
  const seis = 6;
  const zero = 0;
  const fetchBebidasDetalhes = async () => {
    const response = await fetchApiBebidasDetalhes(idDaReceita);
    setEstadoApiBebidas(response);
  };
  useEffect(() => {
    fetchBebidasDetalhes();
  }, []);
  function handleIniciarReceita() {
    setIniciarReceitas([...iniciarReceitas, idDaReceita]);
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
          <p data-testid="0-ingredient-name-and-measure">
            {`${bebida.strIngredient1}  ${bebida.strMeasure1}`}
          </p>
          <p data-testid="1-ingredient-name-and-measure">
            {`${bebida.strIngredient2}  ${bebida.strMeasure2}`}
          </p>
          <p data-testid="2-ingredient-name-and-measure">
            {`${bebida.strIngredient3}  ${bebida.strMeasure3}`}
          </p>
          <p data-testid="3-ingredient-name-and-measure">
            {`${bebida.strIngredient4}  ${bebida.strMeasure4}`}
          </p>
          <p data-testid="4-ingredient-name-and-measure">
            {`${bebida.strIngredient5}  ${bebida.strMeasure5}`}
          </p>
          <p data-testid="5-ingredient-name-and-measure">
            {`${bebida.strIngredient6}  ${bebida.strMeasure6}`}
          </p>
          <p data-testid="6-ingredient-name-and-measure">
            {`${bebida.strIngredient7}  ${bebida.strMeasure7}`}
          </p>
          <p data-testid="7-ingredient-name-and-measure">
            {`${bebida.strIngredient8}  ${bebida.strMeasure8}`}
          </p>
          <p data-testid="8-ingredient-name-and-measure">
            {`${bebida.strIngredient9}  ${bebida.strMeasure9}`}
          </p>
          <p data-testid="9-ingredient-name-and-measure">
            {`${bebida.strIngredient10}  ${bebida.strMeasure10}`}
          </p>
          <p data-testid="10-ingredient-name-and-measure">
            {`${bebida.strIngredient11}  ${bebida.strMeasure11}`}
          </p>
          <p data-testid="11-ingredient-name-and-measure">
            {`${bebida.strIngredient12}  ${bebida.strMeasure12}`}
          </p>
          <p data-testid="12-ingredient-name-and-measure">
            {`${bebida.strIngredient13}  ${bebida.strMeasure13}`}
          </p>
          <p data-testid="13-ingredient-name-and-measure">
            {`${bebida.strIngredient14}  ${bebida.strMeasure14}`}
          </p>
          <p data-testid="14-ingredient-name-and-measure">
            {`${bebida.strIngredient15}  ${bebida.strMeasure15}`}
          </p>
          <p data-testid="15-ingredient-name-and-measure">
            {`${bebida.strIngredient16}  ${bebida.strMeasure16}`}
          </p>
          <p data-testid="16-ingredient-name-and-measure">
            {`${bebida.strIngredient17}  ${bebida.strMeasure17}`}
          </p>
          <p data-testid="17-ingredient-name-and-measure">
            {`${bebida.strIngredient18}  ${bebida.strMeasure18}`}
          </p>
          <p data-testid="18-ingredient-name-and-measure">
            {`${bebida.strIngredient19}  ${bebida.strMeasure19}`}
          </p>
          <p data-testid="19-ingredient-name-and-measure">
            {`${bebida.strIngredient20}  ${bebida.strMeasure20}`}
          </p>
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
        <button
          data-testid="start-recipe-btn"
          className="IniciarReceita"
          type="button"
        >
          Iniciar Receita
        </button>
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
        { receitasTerminadas
          .includes(!idDaReceita)
          ? (
            <button
              data-testid="start-recipe-btn"
              className="IniciarReceita"
              type="button"
              onClick={ handleIniciarReceita }
            >

              Iniciar Receita
            </button>) : ''}
      </div>
    )));
}

export default DetalhesBebida;
