import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import ShareIcon from '../images/shareIcon.svg';
//  import desFavorite from '../images/whiteHeartIcon.svg';
//  import favorite from '../images/blackHeartIcon.svg';

import '../App.css';

export default function FoodInProgress() {
  const { state, setState } = useContext(RecipesContext);
  const params = useParams();
  const arrayClick = []; // popular com id dos clicks.
  const [clickIngred, setClickIngred] = useState([]);// estado controle checked.
  const [isfavorite, setIsFavorite] = useState(false); // estado controlar favoritar.
  const [inputMark, setInputMark] = useState('');// estado controlar className.

  // função clipboard
  const handleShareButton = () => {
    const copyText = window.location.href;
    window.navigator.clipboard.writeText(copyText);
    // eslint-disable-next-line no-alert
    alert('Link copiado!');
  };

  // função controlar o componente ingrediente.
  const checked = (even) => {
    const click = (Number(even.target.id));
    arrayClick.push(click);
    setInputMark(click);
    setClickIngred(arrayClick);
    // salvar no localStorage.
    const { idMeal } = state[0];
    const initial = {
      cocktails: {},
    };
    const currentStorage = JSON.parse(
      localStorage
        .getItem('inProgressRecipes'),
    ) || initial;
    const newStorage = {
      ...currentStorage,
      meals: {
        ...currentStorage.meals,
        ...{ [idMeal]: arrayClick },
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  // função para renderizar os ingreditentes.
  const renderIngredients = () => {
    const ingredientsArray = [];
    const maxPosition = 20;
    for (let i = 1; maxPosition >= i; i += 1) {
      if (state[0][`strIngredient${i}`] === '') {
        break;
      }
      ingredientsArray.push(state[0][`strIngredient${i}`]);
    }
    return ingredientsArray.map((el, idx) => (
      <label
        key={ idx }
        htmlFor={ idx }
        className={ inputMark === idx ? 'checked' : '1' }
        data-testid={ `${idx}-ingredient-step` }
      >
        { el }
        <input
          id={ idx }
          checked={ clickIngred.includes(idx) }
          type="checkbox"
          onChange={ (event) => checked(event) }
        />
      </label>
    ));
  };

  // carregar API
  useEffect(() => {
    fetchApiFood('6', setState, String(params.id));
    if (localStorage.inProgressRecipes) {
      const getStorage = JSON.parse(
        localStorage
          .getItem('inProgressRecipes'),
      );
      if (getStorage.meals[params.id]) {
        setClickIngred(getStorage.meals[params.id]);
      }
    }
  }, []);

  // função para favoritar
  const favoritar = () => {
    if (isfavorite === false) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  return (
    <div>
      {state.map((el, idx) => (
        <div key={ idx }>
          <img
            key={ idx }
            src={ el.strMealThumb }
            alt="food-pic"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{el.strMeal}</h1>
          <h3 data-testid="recipe-category">{el.strCategory}</h3>
          <content>
            { state.length > idx ? renderIngredients() : console.log('fora do ar')}
          </content>
          <content>
            <h2>Instructions</h2>
            <p data-testid="instructions">{el.strInstructions}</p>
          </content>
        </div>
      )) }
      <input
        type="image"
        src={ ShareIcon }
        onClick={ () => handleShareButton() }
        alt="foto-compratilhar"
        data-testid="share-btn"
      />
      <input
        type="image"
        src={ isfavorite === true
          ? '/static/media/blackHeartIcon.b8913346.svg'
          : '/static/media/whiteHeartIcon.ea3b6ba8.svg' }
        alt="foto=favorito"
        data-testid="favorite-btn"
        onClick={ () => favoritar() }
      />
      <a
        href="/receitas-feitas"
      >
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </a>
    </div>
  );
}
