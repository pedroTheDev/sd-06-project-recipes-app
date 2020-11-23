import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../service/drinkApi';

const ExplorarBebidas = () => {
  const [randomDrinkID, setRandomDrink] = useState();

  useEffect(() => {
    fetchRandomDrink().then((response) => {
      setRandomDrink(response.idDrink);
    });
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrinkID}` }>
        <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
};

export default ExplorarBebidas;
