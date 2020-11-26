import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextAPI from '../../Context/ContextAPI';
import './styles.css';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);
  const { stateIdDetails, setIdDetails } = useContext(ContextAPI);

  const recipesDetails = (idMeal) => {
    setIdDetails({
      ...stateIdDetails,
      id: idMeal,
    });
    // window.location.href = `http://localhost:3000/comidas/${idMeal}`;
  };

  const showFoodResearch = () => {
    const number = 11;
    if (apiValueSearch.foods.meals && apiValueSearch.foods.meals.length === 1) {
      const foodID = apiValueSearch.foods.meals[0].idMeal;
      window.location.href = `http://localhost:3000/comidas/${foodID}`;
    } else {
      return (
        apiValueSearch.foods.meals && apiValueSearch.foods.meals.map((meal, index) => {
          if (index <= number) {
            return (
              <div className="card" key={ meal.strMeal } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <button
                  type="button"
                  className="button"
                  onClick={ () => recipesDetails(meal.idMeal) }
                >
                  <Link to={ `/comidas/${meal.idMeal}` }>
                    <img
                      width="200"
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                  </Link>
                </button>
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  const showDrinkResearch = () => {
    const number = 11;
    if (apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.length === 1) {
      const drinkID = apiValueSearch.drinks.drinks[0].idDrink;
      window.location.href = `http://localhost:3000/bebidas/${drinkID}`;
    } else {
      return (
        apiValueSearch.drinks.drinks && apiValueSearch.drinks.drinks.map((res, index) => {
          if (index <= number) {
            return (
              <div className="card" key={ res.idDrink } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{res.strDrink}</p>
                <button
                  type="button"
                  className="button"
                  onClick={ () => recipesDetails(res.idDrink) }
                >
                  <Link to={ `/bebidas/${res.idDrink}` }>
                    <img
                      width="200"
                      src={ res.strDrinkThumb }
                      alt={ res.strDrink }
                      data-testid={ `${index}-card-img` }
                    />
                  </Link>
                </button>
              </div>
            );
          }
          return '';
        })
      );
    }
  };

  return window.location.pathname === '/comidas' ? (
    <div className="main-cards">
      {showFoodResearch() }
    </div>
  ) : (
    <ul className="main-cards">
      {showDrinkResearch()}
    </ul>
  );
};

export default Cards;
