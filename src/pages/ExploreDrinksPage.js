import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { requestRandomDrink } from '../services/requestsAPI';

function ExploreDrinksPage() {
  const history = useHistory();
  // const [randomRecipe, setRandomRecipe] = useState([]);
  async function handleClick() {
    const resultRandom = await requestRandomDrink();
    // setRandomRecipe(resultRandomFood);
    console.log(resultRandom);
    history.push(`/bebidas/${resultRandom.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <h2 data-testid="page-title">Explorar Bebidas</h2>
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>

      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksPage;
