import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import * as api from '../services/Api';
import './styles/pages.css';
// import Header from '../Components/Header';

export default function ProcessoBebidas() {
  const { id } = useParams();
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    selectedDrink,
    setSelectedDrink,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [sharedURL, setSharedURL] = useState(false);

  const prepareDrink = async () => {
    setLoading(true);
    const drink = await api.fetchDrinkbyId(id);
    setSelectedDrink(drink[0]);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Receita em Progresso');
    prepareDrink();
  }, []);

  const getIngredientsArray = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    /* const ingLength = selectedMeal.strIngredient.length - 1; */
    for (let index = noLength; index <= maxLenght; index += 1) {
      if (selectedDrink.length !== noLength && selectedDrink[`strIngredient${index}`]) {
        ingredients.push(`${selectedDrink[`strIngredient${index}`]} 
        ${selectedDrink[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    getIngredientsArray();
  }, [selectedDrink]);

  const onClick = ({ target }) => {
    if (target.checked === true) {
      const element = target;
      element.parentNode.style = 'text-decoration: line-through;';
    }
    if (target.checked === false) {
      const element = target;
      element.parentNode.style = 'text-decoration: none;';
    }
  };

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    setSharedURL(true);
  };

  return (
    <div>
      <h1>{titulo}</h1>
      {loading ? <p>Loading...</p>
        : (
          <div>
            <img
              src={ selectedDrink.strDrinkThumb }
              data-testid="recipe-photo"
              alt="foto-recipe"
              width="200px"
            />
            <h2 data-testid="recipe-title">{selectedDrink.strDrink}</h2>
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
            <h3 data-testid="recipe-category">{selectedDrink.strCategory}</h3>
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
            <p data-testid="instructions">
              Instructions
              {selectedDrink.strInstructions}
            </p>
          </div>
        )}
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </Link>
    </div>
  );
}
