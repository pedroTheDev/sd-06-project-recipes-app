import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

const ExploreFoods = () => {
  const { setTitle } = useContext(HeaderContext);
  const [randomRecipe, setRandomRecipe] = useState('');

  const getRandomRecipe = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const recipeData = await fetch(endpoint);
    const recipe = await recipeData.json();
    setRandomRecipe(recipe.meals[0]);
  };

  useEffect(() => {
    setTitle('Explorar Comidas');
    getRandomRecipe();
  }, []);

  return (
    <div className="explore-container">
      <Link className="explore-btn-link" to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-btn-option"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link className="explore-btn-link" to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
          className="explore-btn-option"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link className="explore-btn-link" to={ `/comidas/${randomRecipe.idMeal}` }>
        <button
          type="button"
          data-testid="explore-surprise"
          className="explore-btn-option"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

export default ExploreFoods;
