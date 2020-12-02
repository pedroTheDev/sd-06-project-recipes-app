import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApiComidasDetalhes } from '../services/FetchApiComidas';
import '../components/MenuInferior.css';
import '../components/detalhes.css';
import share from '../images/shareIcon.svg';
import coracaoBranco from '../images/whiteHeartIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';

function ProgressoComida() {
  const { idDaReceita } = useParams();
  const [estadoApiComidas, setEstadoApiComidas] = useState([]);
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  console.log('teste', estadoApiComidas);

  const fetchComidasDetalhes = async () => {
    const response = await fetchApiComidasDetalhes(idDaReceita);
    setEstadoApiComidas(response);
  };

  useEffect(() => {
    fetchComidasDetalhes();
  }, []);

  // const history = useHistory();
  const inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
  let comidaLocalStorage;
  // let comidaLocalStorage = inProgress.meals[idDaReceita];
  function checkHandle(e, index) {
    if (e.target.checked === true) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'line-through';
      if (localStorage.getItem('inProgressRecipes')) {
        if (localStorage.getItem('inProgressRecipes').meals) {
          comidaLocalStorage = inProgress.meals[idDaReceita];
          comidaLocalStorage = comidaLocalStorage.concat(document
            .getElementById(`${index - 1}-ingredient-check`).innerText);
          const newStorage = {
            ...inProgress,
            meals: {
              ...inProgress.meals,
              [idDaReceita]: comidaLocalStorage,
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        } else {
          comidaLocalStorage = [...comidaLocalStorage,
            document.getElementById(`${index - 1}-ingredient-check`)
              .innerText];
          const newStorage = {
            ...inProgress,
            meals: {
              [idDaReceita]: comidaLocalStorage,
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        }
      } else {
        comidaLocalStorage = [document.getElementById(`${index - 1}-ingredient-check`)
          .innerText];
        const newStorage = {
          meals: {
            [idDaReceita]: comidaLocalStorage,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      }
    }
    if (e.target.checked === false) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'none';
      comidaLocalStorage = comidaLocalStorage
        .filter((comidaLocal) => comidaLocal !== document
          .getElementById(`${index - 1}-ingredient-check`).innerText);
      const newStorage = {
        ...inProgress,
        meals: {
          [idDaReceita]: comidaLocalStorage,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    // const newStorage = {
    //   ...inProgress,
    //   meals: {
    //     ...inProgress.meals,
    //     [idDaReceita]: comidaLocalStorage,
    //   },
    // };
    // localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }
  const vinte = 20;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= vinte; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== ''
      && bebida[`strIngredient${numero}`] !== null) {
        array.push(
          <label
            id={ `${numero - 1}-ingredient-check` }
            htmlFor={ `${numero - 1}-ingredient` }
            data-testid={ `${numero - 1}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${numero - 1}-ingredient-step` }
              className="titulo"
              onChange={ (e) => checkHandle(e, numero) }
            />
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== '')
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}
          </label>,
        );
      }
    }
    return array;
  }

  console.log(receitasSalvas);

  function copiaLink() {
    const copiado = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(copiado).then(() => {
      const link = document.createElement('span');
      link.innerHTML = 'Link copiado!';
      document.getElementById('link-compartilhar').appendChild(link);
    }, () => {
      // eslint-disable-next-line
      alert('erro');
    });
  }
  console.log(window.location.href);
  // onClick={() => {navigator.clipboard.writeText(window.location.href)}}

  function favoritarReceita() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const favorito = {
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
      };
      const favoritosArray = JSON.parse(favoritos);
      const receitasFavoritas = [...favoritosArray, favorito];
      localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
      setReceitasSalvas(receitasFavoritas);
    } else {
      const favorito = {
        id: idDaReceita,
        type: 'comida',
        area: estadoApiComidas[0].strArea,
        category: estadoApiComidas[0].strCategory,
        alcoholicOrNot: '',
        name: estadoApiComidas[0].strMeal,
        image: estadoApiComidas[0].strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorito]));
      setReceitasSalvas([favorito]);
    }
  }

  function desfavoritarReceita() {
    const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoritosAtualizados = favoritos.filter((item) => item.id !== idDaReceita);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritosAtualizados));
    setReceitasSalvas(favoritosAtualizados);
  }

  function renderFavoritar() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const idsFavoritos = [];
      JSON.parse(favoritos).map((favorito) => idsFavoritos.push(favorito.id));
      console.log('testando', idsFavoritos);
      if (idsFavoritos.includes(idDaReceita)) {
        console.log('receita existe');
        return (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ desfavoritarReceita }
            src={ coracaoPreto }
          >
            <img src={ coracaoPreto } alt="coracao" />
          </button>);
      } return (
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoritarReceita }
          src={ coracaoBranco }
        >
          <img src={ coracaoBranco } alt="coracao" />
        </button>);
    }
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoritarReceita }
        src={ coracaoBranco }
      >
        <img src={ coracaoBranco } alt="coracao" />
      </button>);
  }

  return (
    estadoApiComidas.map((comida, index) => (
      <div key={ index }>
        <img
          className="imagemReceita"
          data-testid="recipe-photo"
          src={ comida.strMealThumb }
          alt={ comida.strMeal }
        />
        <button type="button" data-testid="share-btn" onClick={ copiaLink }>
          <img src={ share } alt="share" />
        </button>
        { renderFavoritar() }
        <div id="link-compartilhar" />
        <h2 data-testid="recipe-title" className="titulo">{ comida.strMeal }</h2>
        <h4 data-testid="recipe-category" className="category titulo">
          {comida.strCategory}
        </h4>
        <div>
          <h3 className="titulo">Ingredientes</h3>
          {renderIngrediente(comida)}
        </div>
        <h3 className="titulo">Instruções</h3>
        <p data-testid="instructions" className="intrucoes">{comida.strInstructions}</p>

        <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
      </div>
    )));
}

export default ProgressoComida;
