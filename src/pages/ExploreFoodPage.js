import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestRandomFood } from '../services/requestsAPI';

function ExploreFoodPage() {
  const history = useHistory();
  // const [randomRecipe, setRandomRecipe] = useState([]);
  async function handleClick() {
    const resultRandom = await requestRandomFood();
    // setRandomRecipe(resultRandom);
    console.log(resultRandom);
    history.push(`/comidas/${resultRandom.idMeal}`);
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>

        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>

        <Link to="comidas/">
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ handleClick }
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodPage;
