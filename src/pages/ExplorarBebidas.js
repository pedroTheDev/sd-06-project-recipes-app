import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { fetchRandomDrink } from '../services/drinkAPI';

const ExplorarBebidas = () => {
  const { randomDrinkID, setRandomDrink, setFetchById } = useContext(ReceitasContext);

  useEffect(() => {
    fetchRandomDrink().then((response) => {
      setRandomDrink(response.idDrink);
    });
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              data-testid="explore-by-ingredient"
              type="button"
              className="btn btn-secondary btn-block btn-lg"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link
            to={ `/bebidas/${randomDrinkID}` }
            onClick={ () => setFetchById(false) }
          >
            <button
              data-testid="explore-surprise"
              type="button"
              className="btn btn-secondary btn-block btn-lg"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarBebidas;
