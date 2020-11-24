import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();

  const randomMeal = async () => {
    const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await apiRequest.json();
    return (response.meals);
    // pra mudar de rota vou precisar usar um history.push
    // usar tela Andre pra renderizar através do id da comida
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-by-area"
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => randomMeal() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
