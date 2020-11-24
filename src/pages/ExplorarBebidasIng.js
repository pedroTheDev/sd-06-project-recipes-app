import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients, drinkAPI } from '../services/drinkAPI';

const ExplorarBebidasIng = () => {
  const { drinks, setDrinks, setStopApi } = useContext(ReceitasContext);

  useEffect(() => {
    listIngredients().then((response) => setDrinks(response));
  }, []);

  const zero = 0;
  const twelve = 12;

  return (
    <div>
      <Header title="Explorar por Ingredientes" />
      {drinks.slice(zero, twelve).map((ingred, index) => (
        <Link
          to="/bebidas"
          data-testid={ `${index}-ingredient-card` }
          key={ ingred.strIngredient1 }
          onClick={ () => {
            drinkAPI('ingredient', ingred.strIngredient1)
              .then((response) => setDrinks(response));
            setStopApi(true);
          } }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient1}-Small.png` }
            alt={ ingred.strIngredient1 }
          />
          <span data-testid={ `${index}-card-name` }>{ingred.strIngredient1}</span>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ExplorarBebidasIng;
