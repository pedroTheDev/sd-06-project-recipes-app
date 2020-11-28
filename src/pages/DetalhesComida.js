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

  // const inProgress = JSON.parse((localStorage.getItem(inProgressRecipes)));
  // const idIniciados = Object.keys(inProgress.meals);

  const history = useHistory();
  function handleIniciarReceita() {
    setIniciarReceitas([...iniciarReceitas, idDaReceita]);
    console.log(idDaReceita);
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.meals) {
        idIniciados = Object.keys(inProgress.meals);
        if (!idIniciados.includes(idDaReceita)) {
          const novaReceita = {
            ...inProgress,
            meals: {
              ...inProgress.meals,
              [idDaReceita]: [],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(novaReceita));
        }
      } else {
        const newMeal = {
          ...inProgress,
          meals: {
            [idDaReceita]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
      }
    } else {
      const newMeal = {
        meals: {
          [idDaReceita]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
    }
    history.push(`/comidas/${idDaReceita}/in-progress`);
  }

  const continuarReceita = () => {
    history.push(`/comidas/${idDaReceita}/in-progress`);
  };

  const buttonIniciar = () => {
    let inProgress;
    let idIniciados;
    if (localStorage.getItem('inProgressRecipes')) {
      inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
      if (inProgress.meals) {
        idIniciados = Object.keys(inProgress.meals);
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
    } else {
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
  };

  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

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
          <p data-testid="0-ingredient-name-and-measure">
            {`${comida.strIngredient1}  ${comida.strMeasure1}`}
          </p>
          <p data-testid="1-ingredient-name-and-measure">
            {`${comida.strIngredient2}  ${comida.strMeasure2}`}
          </p>
          <p data-testid="2-ingredient-name-and-measure">
            {`${comida.strIngredient3}  ${comida.strMeasure3}`}
          </p>
          <p data-testid="3-ingredient-name-and-measure">
            {`${comida.strIngredient4}  ${comida.strMeasure4}`}
          </p>
          <p data-testid="4-ingredient-name-and-measure">
            {`${comida.strIngredient5}  ${comida.strMeasure5}`}
          </p>
          <p data-testid="5-ingredient-name-and-measure">
            {`${comida.strIngredient6}  ${comida.strMeasure6}`}
          </p>
          <p data-testid="6-ingredient-name-and-measure">
            {`${comida.strIngredient7}  ${comida.strMeasure7}`}
          </p>
          <p data-testid="7-ingredient-name-and-measure">
            {`${comida.strIngredient8}  ${comida.strMeasure8}`}
          </p>
          <p data-testid="8-ingredient-name-and-measure">
            {`${comida.strIngredient9}  ${comida.strMeasure9}`}
          </p>
          <p data-testid="9-ingredient-name-and-measure">
            {`${comida.strIngredient10}  ${comida.strMeasure10}`}
          </p>
          <p data-testid="10-ingredient-name-and-measure">
            {`${comida.strIngredient11}  ${comida.strMeasure11}`}
          </p>
          <p data-testid="11-ingredient-name-and-measure">
            {`${comida.strIngredient12}  ${comida.strMeasure12}`}
          </p>
          <p data-testid="12-ingredient-name-and-measure">
            {`${comida.strIngredient13}  ${comida.strMeasure13}`}
          </p>
          <p data-testid="13-ingredient-name-and-measure">
            {`${comida.strIngredient14}  ${comida.strMeasure14}`}
          </p>
          <p data-testid="14-ingredient-name-and-measure">
            {`${comida.strIngredient15}  ${comida.strMeasure15}`}
          </p>
          <p data-testid="15-ingredient-name-and-measure">
            {`${comida.strIngredient16}  ${comida.strMeasure16}`}
          </p>
          <p data-testid="16-ingredient-name-and-measure">
            {`${comida.strIngredient17}  ${comida.strMeasure17}`}
          </p>
          <p data-testid="17-ingredient-name-and-measure">
            {`${comida.strIngredient18}  ${comida.strMeasure18}`}
          </p>
          <p data-testid="18-ingredient-name-and-measure">
            {`${comida.strIngredient19}  ${comida.strMeasure19}`}
          </p>
          <p data-testid="19-ingredient-name-and-measure">
            {`${comida.strIngredient20}  ${comida.strMeasure20}`}
          </p>
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
        {buttonIniciar()}
      </div>
    )));
}

export default DetalhesComidas;
