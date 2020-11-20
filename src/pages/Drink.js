import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Drink.css';

function Drink() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    const fecthDrinks = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setDrinks(APIResponse.drinks);
      }
    };
    fecthDrinks();

    const fecthCategory = async () => {
      const APIRequestCategory = await fetch(urlCategories);
      const APIResponseCategory = await APIRequestCategory.json();
      if (APIResponseCategory !== null) {
        setCategories(APIResponseCategory.drinks);
      }
    };
    fecthCategory();
  }, []);

  const firstDrink = 0;
  const limitDrink = 12;
  const limitCategory = 5;

  return (
    <div className="drink-container">
      <Header title="Bebidas" />
      {
        categories.slice(firstDrink, limitCategory).map((category, id) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ id }
            type="button"
          >
            {category.strCategory}
          </button>))
      }
      {
        drinks.slice(firstDrink, limitDrink).map((drink, id) => (
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
