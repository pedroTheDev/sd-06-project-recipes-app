import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

function Drink() {
  const [drinks, setDrinks] = useState([]);
  const [isFecthing, setIsFecthing] = useState(true);

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

  const limitDrink = 12;

  const loading = () => {
    if (isFecthing === true) {
      return 'loading...';
    }
  };

  return (
    <>
      <h1>Drink</h1>
      <p>{loading()}</p>
      {
        drinks.splice(1, limitDrink).map((drink, id) => (
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
