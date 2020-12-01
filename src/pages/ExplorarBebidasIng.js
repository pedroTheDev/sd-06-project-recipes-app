import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients, drinkAPI } from '../services/drinkAPI';

const ExplorarBebidasIng = () => {
  const {
    setDrinks,
    drinksIngredientList,
    setDrinksIngredientList,
    setStopApi,
  } = useContext(ReceitasContext);

  useEffect(() => {
    listIngredients().then((response) => setDrinksIngredientList(response));
    setDrinks([{ teste: 'teste' }]);
  }, []);
  console.log(drinksIngredientList);
  const zero = 0;
  const twelve = 12;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="row mb-5 mt-5 pt-3">
        { drinksIngredientList
          && drinksIngredientList.slice(zero, twelve).map((ingred, index) => (
            <Link
              to="/bebidas"
              data-testid={ `${index}-ingredient-card` }
              key={ ingred.strIngredient1 }
              className="col-6 mb-3"
              onClick={ () => {
                drinkAPI('ingredient', ingred.strIngredient1)
                  .then((response) => setDrinks(response));
                setStopApi(true);
              } }
            >
              <div className="card shadow-sm bg-white rounded">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient1}-Small.png` }
                  alt={ ingred.strIngredient1 }
                />
                <div className="card-body">
                  <h5
                    className="card-title mb-0"
                    data-testid={ `${index}-card-name` }
                  >
                    {ingred.strIngredient1}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarBebidasIng;
