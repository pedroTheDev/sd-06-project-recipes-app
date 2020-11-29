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

  const history = useHistory();
  function handleIniciarReceita() {
    setIniciarReceitas([...iniciarReceitas, idDaReceita]);
    console.log(idDaReceita);
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.cocktails) {
        idIniciados = Object.keys(inProgress.cocktails);
        if (!idIniciados.includes(idDaReceita)) {
          const novaReceita = {
            ...inProgress,
            cocktails: {
              ...inProgress.cocktails,
              [idDaReceita]: [],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(novaReceita));
        }
      } else {
        const newMeal = {
          ...inProgress,
          cocktails: {
            [idDaReceita]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
      }
    } else {
      const newMeal = {
        cocktails: {
          [idDaReceita]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
    }
    history.push(`/bebidas/${idDaReceita}/in-progress`);
  }

  const continuarReceita = () => {
    history.push(`/bebidas/${idDaReceita}/in-progress`);
  };

  const buttonIniciar = () => {
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.cocktails) {
        idIniciados = Object.keys(inProgress.cocktails);
        if (!idIniciados.includes(idDaReceita)) {
          return (
            <button
              data-testid="start-recipe-btn"
              className="IniciarReceita"
              type="button"
              id="IniciarReceita"
              onClick={ handleIniciarReceita }
            >
              Iniciar Receita
            </button>
          );
        }
        return (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ continuarReceita }
          >
            Continuar Receita
          </button>
        );
      }
      return (
        <button
          data-testid="start-recipe-btn"
          className="IniciarReceita"
          type="button"
          id="IniciarReceita"
          onClick={ handleIniciarReceita }
        >
          Iniciar Receita
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        className="IniciarReceita"
        type="button"
        id="IniciarReceita"
        onClick={ handleIniciarReceita }
      >
        Iniciar Receita
      </button>
    );
  };

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
        {buttonIniciar()}
      </div>
    )));
}

export default DetalhesBebida;
