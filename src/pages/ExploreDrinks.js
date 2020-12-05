import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import './Explore.css';

const ExploreDrinks = () => {
  const { setTitle } = useContext(HeaderContext);

  const [randomRecipe, setRandomRecipe] = useState('');

  const getRandomRecipe = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const recipeData = await fetch(endpoint);
    const recipe = await recipeData.json();
    setRandomRecipe(recipe.drinks[0]);
  };

  useEffect(() => {
    setTitle('Explorar Bebidas');
    getRandomRecipe();
  }, []);

  return (
    <div className="explore-container">
      <Link className="explore-btn-link" to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient" className="explore-btn-option">
          Por Ingredientes
        </button>
      </Link>
      <Link className="explore-btn-link" to={ `/bebidas/${randomRecipe.idDrink}` }>
        <button type="button" data-testid="explore-surprise" className="explore-btn-option">
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

export default ExploreDrinks;
