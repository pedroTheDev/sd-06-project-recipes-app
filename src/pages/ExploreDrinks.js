import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

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
    <div className="main">
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient" className="btn-explore">
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomRecipe.idDrink}` }>
        <button type="button" data-testid="explore-surprise" className="btn-explore">
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

export default ExploreDrinks;
