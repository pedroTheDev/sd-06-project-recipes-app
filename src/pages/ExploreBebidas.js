import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import { getRecipeDrinksByRandom } from '../services/drinksAPI';

function ExploreBebidas() {
  const [idRecipeRandom, setRecipeRandom] = useState('');
  async function getRandom() {
    const result = await getRecipeDrinksByRandom();
    setRecipeRandom(result[0].idDrink);
  }
  return (
    <div>
      <h1>Explore Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={ getRandom }>
        Me Surpreenda!
      </button>
      {
        idRecipeRandom !== ''
          ? (<Redirect to={ `/bebidas/${idRecipeRandom}` } />)
          : null
      }
      <Footer />
    </div>
  );
}

export default ExploreBebidas;
