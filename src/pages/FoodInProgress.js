import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';
import ShareIcon from '../images/shareIcon.svg';
import Favorite from '../images/blackHeartIcon.svg';
import desFavorite from '../images/whiteHeartIcon.svg';

import '../App.css';

export default function FoodInProgress() {
  const { state, setState } = useContext(RecipesContext);
  const history = useHistory();
  const params = useParams();
  const objStorage = [];
  // carregar API
  useEffect(() => {
    fetchApiFood('6', setState, String(params.id));
  }, []);

  // função marcar os ingredientes e salvar no localStorage.
  const checked = (e) => {
    //  marcar ingredientes
    const vai = e.target;
    const label = document.getElementsByClassName('1')[vai.id];
    label.classList.add('checked');
    //  salvar no localStorage
    objStorage.push(Number(label.htmlFor));
    const { idMeal } = state[0];
    const initial = {
      meals: {},
    };
    const currentStorage = JSON.parse(
      localStorage
        .getItem('recipesInProgress'),
    ) || initial;
    const newStorage = {
      ...currentStorage,
      meals: {
        ...currentStorage.meals,
        ...{ [idMeal]: objStorage },
      },
    };
    localStorage.setItem('recipesInProgress', JSON.stringify(newStorage));
  };
  // função para favoritar
  const favoritar = (e) => {
    const click = e.target;
    click.src = 'http://localhost:3000/static/media/blackHeartIcon.b8913346.svg';
  };

  return (
    <div>
      {state.map((el, idx) => (
        <div key={ idx }>
          <img
            key={ idx }
            src={ el.strMealThumb }
            alt="fodd-pic"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{el.strMeal}</h1>
          <h3 data-testid="recipe-category">{el.strCategory}</h3>
          <content>
            {
              (el.strIngredient1 !== '' && el.strIngredient1 !== null)
                && (
                  <label
                    htmlFor="0"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient1 }
                    <input
                      id="0"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient2 !== '' && el.strIngredient2 !== null)
                && (
                  <label
                    htmlFor="1"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient2 }
                    <input
                      id="1"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient3 !== '' && el.strIngredient3 !== null)
                && (
                  <label
                    htmlFor="2"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient3 }
                    <input
                      id="2"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient4 !== '' && el.strIngredient4 !== null)
                && (
                  <label
                    htmlFor="3"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient4 }
                    <input
                      id="3"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient5 !== '' && el.strIngredient5 !== null)
                && (
                  <label
                    htmlFor="4"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient5 }
                    <input
                      id="4"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient6 !== '' && el.strIngredient6 !== null)
                && (
                  <label
                    htmlFor="5"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient6 }
                    <input
                      id="5"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient7 !== '' && el.strIngredient7 !== null)
                && (
                  <label
                    htmlFor="6"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient7 }
                    <input
                      id="6"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient8 !== '' && el.strIngredient8 !== null)
                && (
                  <label
                    htmlFor="7"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient8 }
                    <input
                      id="7"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient9 !== '' && el.strIngredient9 !== null)
                && (
                  <label
                    htmlFor="8"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient9 }
                    <input
                      id="8"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient10 !== '' && el.strIngredient10 !== null)
                && (
                  <label
                    htmlFor="9"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient10 }
                    <input
                      id="9"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient11 !== '' && el.strIngredient11 !== null)
                && (
                  <label
                    htmlFor="10"
                    className="1"
                    data-testid="1-ingredient-step"
                  >
                    { el.strIngredient11 }
                    <input
                      id="10"
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
          </content>
          <content>
            <h2>Instructions</h2>
            <p data-testid="instructions">{el.strInstructions}</p>
          </content>
        </div>
      )) }
      <a
        href="/bebidas"
      >
        <img
          src={ ShareIcon }
          alt="foto-compratilhar"
          data-testid="share-btn"
        />
      </a>
      <input
        src={ desFavorite }
        alt="foto=favorito"
        data-testid="favorite-btn"
        onClick={ (event) => favoritar(event) }
      />
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}
