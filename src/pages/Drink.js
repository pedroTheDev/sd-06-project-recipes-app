import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Drink.css';

function Drink() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState('');
  const [currentDrinks, setCurrentDrinks] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const urlDrinksCategories = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${currentCategories}`;

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

  useEffect(() => {
    const fecthDrinksCategory = async () => {
      if (currentCategories !== '') {
        const APIRequestDrinksCategory = await fetch(urlDrinksCategories);
        const APIResponseDrinksCategory = await APIRequestDrinksCategory.json();
        console.log(APIResponseDrinksCategory);
        if (APIResponseDrinksCategory !== null) {
          setCurrentDrinks(APIResponseDrinksCategory.drinks);
        }
      }
    };
    fecthDrinksCategory();
  }, [currentCategories]);

  const firstDrink = 0;
  const limitDrink = 12;
  const limitCategory = 5;

  const renderDrinks = () => {
    if (currentCategories === '') {
      return drinks.slice(firstDrink, limitDrink).map((drink, id) => (
        <div
          key={ id }
          className="recipe-card"
          data-testid={ `${id}-recipe-card` }
          value={ drink.strCategory }
        >
          <img
            className="card-img"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${id}-card-img` }
          />
          <h3 data-testid={ `${id}-card-name` }>{drink.strDrink}</h3>
        </div>
      ));
    } if (currentDrinks) {
      return currentDrinks
        .slice(firstDrink, limitDrink).map((drink, id) => (
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recipe-card` }
            value={ drink.strCategory }
          >
            <img
              className="card-img"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${id}-card-img` }
            />
            <p data-testid={ `${id}-card-name` }>{drink.strDrink}</p>
          </div>
        ));
    }
  };

  const handleClickCategory = async ({ target: { value } }) => {
    if (currentCategories !== value) {
      setCurrentCategories(value);
    }
    if (currentCategories === value) {
      setCurrentCategories('');
    }
  };

  return (
    <div className="drink-container">
      <Header title="Bebidas" />
      {
        categories.slice(firstDrink, limitCategory).map((category, id) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ id }
            type="button"
            value={ category.strCategory }
            onClick={ handleClickCategory }
          >
            {category.strCategory}
          </button>))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCurrentCategories('') }
      >
        Todas
      </button>
      {
        renderDrinks()
      }
      <Footer />
    </div>
  );
}

export default Drink;
