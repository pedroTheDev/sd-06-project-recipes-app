import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import * as api from '../services/Api';
import './styles/pages.css';
// import Header from '../Components/Header';

export default function ProcessoComidas() {
  const { id } = useParams();
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    selectedMeal,
    setSelectedMeal,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [check, setCheck] = useState(false);
  const [sharedURL, setSharedURL] = useState(false);

  const prepareFood = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    setSelectedMeal(meal[0]);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Receita em Progresso');
    prepareFood();
  }, []);

  const getIngredientsArray = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    for (let index = noLength; index <= maxLenght; index += 1) {
      if (selectedMeal.length !== noLength && selectedMeal[`strIngredient${index}`]) {
        ingredients.push(`${selectedMeal[`strIngredient${index}`]} 
        ${selectedMeal[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    getIngredientsArray();
    console.log(arrayIngredients);
  }, [selectedMeal]);

  /* const getChecked = ({ target }) => {
    const ingredientFilter = document.querySelectorAll('input');
    ingredientFilter.filter((ing) => ing[target.id].checked === true);
  }; */

  const onClick = ({ target }) => {
    /* const twelve = arrayIngredients.length - 1; */
    if (target.checked === true) {
      let element = document.getElementsByTagName('label')[target.id].innerText;
      element = target;
      element.parentNode.style = 'text-decoration: line-through;';
    }
    if (target.checked === false) {
      let element = document.getElementsByTagName('label')[target.id].innerText;
      element = target;
      element.parentNode.style = 'text-decoration: none;';
    }
    /* const ingredientFilter = document.querySelectorAll('input');
    console.log(); */
  };

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    console.log(url);
    setSharedURL(true);
  };

  const verify = () => {
    const tamanho = arrayIngredients.length - 1;
    const noLength = 0;
    let totalCheck = noLength;
    for (let ind = noLength; ind <= tamanho; ind += 1) {
      if (document.getElementsByTagName('input')[ind].checked === true) {
        totalCheck += 1;
        if (totalCheck === tamanho) {
          setCheck(true);
          console.log(check);
        }
      }
    }
  };

  return (
    <div className="container-processo-comida">
      <h1>{titulo}</h1>
      {loading ? <p>Loading...</p>
        : (
          <div>
            <img
              src={ selectedMeal.strMealThumb }
              data-testid="recipe-photo"
              alt="foto-recipe"
              width="200px"
            />
            <h2 data-testid="recipe-title">{selectedMeal.strMeal}</h2>
            <div>
              <button
                type="button"
                src={ ShareIcon }
                alt="compartilhar"
                data-testid="share-btn"
                onClick={ urlToClipboard }
              >
                Compartilhar
              </button>
              {sharedURL ? <p>Link copiado!</p> : null}
            </div>
            <button
              type="button"
              src={ HeartIcon }
              alt="favoritar"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <h3 data-testid="recipe-category">{selectedMeal.strCategory}</h3>
            { arrayIngredients.map((ingredient, index) => (
              <label
                htmlFor={ index }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ index }
                  nome={ ingredient }
                  value={ ingredient }
                  onClick={ (e) => onClick(e) }
                />
                { ingredient }
              </label>
            ))}
            <p
              data-testid="instructions"
              className="riscado"
            >
              Instructions
              {selectedMeal.strInstructions}
            </p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ verify }
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
