import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Drink.css';

function Drink() {
  const [drinks, setDrinks] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fecthDrinks = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setDrinks(APIResponse.drinks);
      }
    };
    fecthDrinks();
  }, []);

  const firstMeal = 0;
  const limitDrink = 12;

  return (
    <div className="drink-container">
      <Header title="Bebidas" />
      {
        drinks.slice(firstMeal, limitDrink).map((drink, id) => (
          <div className="recipe-card" key={ id } data-testid={ `${id}-recipe-card` }>
            <img
              className="card-img"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{drink.strDrink}</h3>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default Drink;
