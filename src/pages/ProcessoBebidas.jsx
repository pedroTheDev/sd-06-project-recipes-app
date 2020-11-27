import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import * as api from '../services/Api';
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
            <button
              type="button"
              src={ ShareIcon }
              alt="compartilhar"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
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
              >
                <input
                  type="checkbox"
                  id={ index }
                  nome={ ingredient }
                  value={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
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
