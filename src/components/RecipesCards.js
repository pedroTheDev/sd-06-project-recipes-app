import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipeCards.css';

function RecipesCards({ title }) {
  const { data, setData, isLoading } = useContext(RecipesContext);
  const [categories, setCategories] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const DOZE = 12;
  const CINCO = 5;

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const responseJson = await response.json();

      const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const responseJson2 = await response2.json();
      setCategories([responseJson, responseJson2]);
    }
    fetchCategories();
  }, []);

  const selectCategorie = async ({ innerText }) => {
    if (innerText === 'All' || innerText === selectedCategorie) {
      const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseMealJson = await responseMeal.json();

      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const responseDrinksJson = await responseDrinks.json();
      return setData([responseMealJson, responseDrinksJson]);
    }
    if (title === 'Comidas') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`);
      const responseJson = await response.json();
      setSelectedCategorie(innerText);
      return setData([responseJson, data[1]]);
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`);
    const responseJson = await response.json();
    setSelectedCategorie(innerText);
    return setData([data[0], responseJson]);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (title === 'Comidas') {
    return (
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ ({ target }) => selectCategorie(target) }
        >
          All
        </button>
        {categories[0].meals.filter((_, index) => index < CINCO)
          .map(({ strCategory }) => (
            <button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              onClick={ ({ target }) => selectCategorie(target) }
            >
              { strCategory }
            </button>)) }
        {
          data[0].meals.filter((_, index) => index < DOZE)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link
                key={ idMeal }
                to={ {
                  pathname: `/comidas/${idMeal}`,
                  state: { recipe: { strMeal, strMealThumb } },
                } }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="card-recipe"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
                </div>
              </Link>
            ))
        }
      </div>
    );
  }
  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ ({ target }) => selectCategorie(target) }
      >
        All
      </button>
      {categories[1].drinks.filter((_, index) => index < CINCO)
        .map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            type="button"
            onClick={ ({ target }) => selectCategorie(target) }
          >
            { strCategory }
          </button>)) }
      {
        data[1].drinks.filter((_, index) => index < DOZE)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <Link
              key={ idDrink }
              to={ {
                pathname: `/bebidas/${idDrink}`,
                state: { recipe: { strDrink, strDrinkThumb } },
              } }
            >
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-recipe"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
              </div>
            </Link>
          ))
      }
    </div>
  );
}

RecipesCards.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipesCards;
