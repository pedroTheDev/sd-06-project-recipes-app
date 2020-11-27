import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchApiFood from '../services/FetchApiFood';

import '../App.css';

export default function FoodInProgress() {
  const { state, setState } = useContext(RecipesContext);
  const history = useHistory();
  const params = useParams();
  const objStorage = [];
  //  const { idMeal } = state[0];
  //  const idRecipes = { idMeal: objStorage };

  /* useEffect(() => {
    if (state.length > 0) {
      const { idMeal } = state[0];
    }
  }, [state]); */
  useEffect(() => {
    fetchApiFood('6', setState, String(params.id));
  }, []);

  // função marcar os ingredientes e salvar no localStorage.
  const checked = (e) => {
    const vai = e.target;
    const label = document.getElementsByClassName('1')[vai.id];
    objStorage.push(label.innerText);

    const { idMeal } = state[0];
    let recipesStorage = {
      meals: {
        [idMeal]: objStorage,
      } };

    recipesStorage = {
      ...recipesStorage,
      meals: {
        ...recipesStorage.meals,
        [idMeal]: [...recipesStorage.meals[idMeal], label.innerText],
      },
    };

    console.log('TEST', recipesStorage);

    localStorage.setItem('inProgressRecipes', JSON.stringify(test));

    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    console.log({ ...getStorage.meals, test });

    label.classList.add('checked');
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
          <content>
            {
              (el.strIngredient1 === '')
                ? ''
                : <label
                  htmlFor="0"
                  className="1"
                >
                  { el.strIngredient1 }
                <input
                  id="0"
                  data-testid={ `${idx}-ingredient-step` }
                  type="checkbox"
                  onClick={ (event) => checked(event) }
                />
                </label>
            }
            {
              (el.strIngredient2 !== '')
                && (
                  <label
                    htmlFor="1"
                    className="1"
                  >
                    { el.strIngredient2 }
                    <input
                      id="1"
                      data-testid={ `${idx}-ingredient-step` }
                      type="checkbox"
                      onClick={ (event) => checked(event) }
                    />
                  </label>
                )
            }
            {
              (el.strIngredient3 === '')
                ? ''
                : <label
                    htmlFor="2"
                    className="1"
                >
                  { el.strIngredient3 }
                  <input
                    id="2"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient4 === '')
                ? ''
                : <label
                    htmlFor="3"
                    className="1"
                >
                  { el.strIngredient4 }
                  <input
                    id="3"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient5 === '')
                ? ''
                : <label
                    htmlFor="4"
                    className="1"
                >
                  { el.strIngredient5 }
                  <input
                    id="4"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient6 === '')
                ? ''
                : <label
                    htmlFor="5"
                    className="1"
                >
                  { el.strIngredient6 }
                  <input
                    id="5"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient7 === '')
                ? ''
                : <label
                    htmlFor="6"
                    className="1"
                >
                  { el.strIngredient7 }
                  <input
                    id="6"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient8 === '')
                ? ''
                : <label
                    htmlFor="7"
                    className="1"
                >
                  { el.strIngredient8 }
                  <input
                    id="7"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient9 === '')
                ? ''
                : <label
                    htmlFor="8"
                    className="1"
                >
                  { el.strIngredient9 }
                  <input
                    id="8"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient10 === '')
                ? ''
                : <label
                    htmlFor="9"
                    className="1"
                >
                  { el.strIngredient10 }
                  <input
                    id="9"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
            {
              (el.strIngredient11 === '')
                ? ''
                : <label
                    htmlFor="10"
                    className="1"
                >
                  { el.strIngredient11 }
                  <input
                    id="10"
                    data-testid={ `${idx}-ingredient-step` }
                    type="checkbox"
                    onClick={ (event) => checked(event) }
                  />
                </label>
            }
          </content>
        </div>
      )) }
      <button type="button">Finalizar</button>
    </div>
  );
}
