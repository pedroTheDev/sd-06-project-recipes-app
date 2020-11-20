import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drink() {
  const [drinks, setDrinks] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const fecthDrinks = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setDrinks(APIResponse.drinks);
        setIsFecthing(false);
      }
    };
    fecthDrinks();
  }, []);

  const firstMeal = 0;
  const limitDrink = 12;

  return (
    <>
      <Header title="Bebidas" />
      {
        drinks.slice(firstMeal, limitDrink).map((drink, id) => (
          <div key={ id } data-testid={ `${id}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${id}-card-img` }
            />
            <h1 data-testid={ `${id}-card-name` }>{drink.strDrink}</h1>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default Drink;
