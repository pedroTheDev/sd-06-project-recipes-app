import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function ExploreDrinks() {
  const history = useHistory();

  const randomDrink = async () => {
    const apiRequest = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const response = await apiRequest.json();
    const responseId = response.drinks[0].idDrink;
    return history.push(`/bebidas/${responseId}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => randomDrink() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
