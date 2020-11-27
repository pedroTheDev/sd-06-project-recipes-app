import React, { useContext, useEffect, useParams, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';
import * as api from '../services/Api';
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

  const prepareFood = async () => {
    setLoading(true);
    const meal = await api.fetchFoodById(id);
    setSelectedMeal(meal[0]);
    setLoading(false);
  };

  const getIngredientsArray = () => {
    const ingredients = [];
    const noLength = 0;
    const ingLength = selectedMeal.strIngredient.length - 1;
    for (let index = noLength; index <= ingLength; index += 1) {
      if (selectedMeal.length !== noLength && selectedMeal[`strIngredient${index}`]) {
        ingredients.push(`${selectedMeal[`strIngredient${index}`]} 
        ${selectedMeal[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    setTitulo('Receita em Progresso');
    prepareFood();
    getIngredientsArray();
  }, []);

  return (
    <div>
      <h1>{titulo}</h1>
      {loading ? <p>Loading...</p>
        : (
          <div>
            <img
              src={ selectedMeal.strMealThumb }
              data-testid="recipe-photo"
              alt="foto-recipe"
            />
            <h2 data-testid="recipe-title">{selectedMeal.strMeal}</h2>
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
            <h3 data-testid="recipe-category">{selectedMeal.strCategory}</h3>
            { arrayIngredients.map((ingredient, index) => (
              <p
                key={ index }
              >
                <input
                  type="checkbox"
                  id={ index }
                  nome={ ingredient }
                  value={ index }
                  data-testid={ `${index}-ingredient-stepIngredientes` }
                />
                { ingredient }
              </p>
            ))}
            <p data-testid="instructions">
              Instructions
              {selectedMeal.strInstructions}
            </p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="finish-recipe-btn"
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}
