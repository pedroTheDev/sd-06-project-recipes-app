import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApiBebidasDetalhes } from '../services/FetchApiBebidas';
import '../components/MenuInferior.css';
import '../components/detalhes.css';
import share from '../images/shareIcon.svg';
import coracaoBranco from '../images/whiteHeartIcon.svg';
import coracaoPreto from '../images/blackHeartIcon.svg';

function DetalhesBebida() {
  const { idDaReceita } = useParams();
  const [estadoApiBebidas, setEstadoApiBebidas] = useState([]);
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  console.log(receitasSalvas);

  const fetchBebidasDetalhes = async () => {
    const response = await fetchApiBebidasDetalhes(idDaReceita);
    setEstadoApiBebidas(response);
  };

  // const history = useHistory();

  const inProgress = JSON.parse((localStorage.getItem('inProgressRecipes')));
  let bebidaLocalStorage = inProgress.cocktails[idDaReceita];
  function checkHandle(e, index) {
    if (e.target.checked === true) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'line-through';
      bebidaLocalStorage = bebidaLocalStorage.concat(document
        .getElementById(`${index - 1}-ingredient-check`).innerText);
    }
    if (e.target.checked === false) {
      document.getElementById(`${index - 1}-ingredient-check`)
        .style.textDecoration = 'none';
      bebidaLocalStorage = bebidaLocalStorage
        .filter((bebidaLocal) => bebidaLocal !== document
          .getElementById(`${index - 1}-ingredient-check`).innerText);
    }
    const newStorage = {
      ...inProgress,
      cocktails: {
        ...inProgress.cocktails,
        [idDaReceita]: bebidaLocalStorage,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }
  useEffect(() => {
    fetchBebidasDetalhes();
  }, []);

  const quinze = 15;
  function renderIngrediente(bebida) {
    const array = [];
    for (let numero = 1; numero <= quinze; numero += 1) {
      if (bebida[`strIngredient${numero}`] !== null
      && bebida[`strIngredient${numero}`] !== '') {
        array.push(
          <label
            id={ `${numero - 1}-ingredient-check` }
            htmlFor={ `${numero - 1}-ingredient-step` }
            data-testid={ `${numero - 1}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${numero - 1}-ingredient-step` }
              className="titulo"
              onChange={ (e) => checkHandle(e, numero) }
            />
            {`${bebida[`strIngredient${numero}`]} `}
            {(bebida[`strMeasure${numero}`] !== null)
              ? <span>{`${bebida[`strMeasure${numero}`]}`}</span>
              : ''}

          </label>,
        );
      }
    }
    return array;
  }
  function copiaLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const link = document.createElement('span');
      link.innerHTML = 'Link copiado!';
      document.getElementById('link-compartilhar').appendChild(link);
    }, () => {
      // eslint-disable-next-line
      alert('erro');
    });
  }
  // console.log(estadoApiBebidas);

  function favoritarReceita() {
    const favoritos = localStorage.getItem('favoriteRecipes');
    if (favoritos) {
      const favorito = {
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
      };
      const favoritosArray = JSON.parse(favoritos);
      const receitasFavoritas = [...favoritosArray, favorito];
      localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
      setReceitasSalvas(receitasFavoritas);
    } else {
      const favorito = {
        id: idDaReceita,
        type: 'bebida',
        area: '',
        category: estadoApiBebidas[0].strCategory,
        alcoholicOrNot: estadoApiBebidas[0].strAlcoholic,
        name: estadoApiBebidas[0].strDrink,
        image: estadoApiBebidas[0].strDrinkThumb,
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
    (!estadoApiBebidas)
      ? (<p>Loading...</p>)
      : estadoApiBebidas.map((bebida, index) => (
        <div key={ index }>
          <img
            className="imagemReceita"
            data-testid="recipe-photo"
            src={ bebida.strDrinkThumb }
            alt={ bebida.strDrink }
          />
          <button type="button" data-testid="share-btn" onClick={ copiaLink }>
            <img src={ share } alt="share" />
          </button>
          { renderFavoritar() }
          <div id="link-compartilhar" />
          <h2 data-testid="recipe-title" className="titulo">{ bebida.strDrink }</h2>
          <h4 data-testid="recipe-category" className="category titulo">
            {bebida.strAlcoholic}
          </h4>
          <div>
            <h3 className="titulo">Ingredientes</h3>
            {renderIngrediente(bebida)}
          </div>
          <h3 className="titulo">Instruções</h3>
          <p data-testid="instructions" className="intrucoes">{bebida.strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
        </div>
      )));
}

export default DetalhesBebida;
