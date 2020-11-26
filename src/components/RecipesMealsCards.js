import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../style/RecipeMealsCards.css';

function RecipesMealsCards({ categories }) {
  const { data, setData } = useContext(RecipesContext);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const CINCO = 5;
  const DOZE = 12;

  const selectCategorie = async ({ innerText }) => {
    if (innerText === 'All' || innerText === selectedCategorie) {
      const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseMealJson = await responseMeal.json();
      return setData([responseMealJson]);
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`);
    const responseJson = await response.json();
    setSelectedCategorie(innerText);
    return setData([responseJson, data[1]]);
  };

  if (!categories) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="div-bttn-category-meals">
      <button
        className="bttn-category-meals"
        data-testid="All-category-filter"
        type="button"
        onClick={ ({ target }) => selectCategorie(target) }
      >
        All
      </button>
      {categories[0].meals.filter((_, index) => index < CINCO)
        .map(({ strCategory }) => (
          <button
            className="bttn-category-meals"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ ({ target }) => selectCategorie(target) }
          >
            { strCategory }
          </button>)) }
      <div className="card-div">
        {
          data[0].meals.filter((_, index) => index < DOZE)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <Link
                key={ idMeal }
                to={ `/comidas/${idMeal}` }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="card-recipe-div"
                >
                  <img
                    className="card-recipe-img"
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <h1 
                    className="card-recipe-title" 
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }
                  </h1>
                </div>
              </Link>
            ))
        }
      </div>
    </div>
  );
}

RecipesMealsCards.propTypes = {
  categories: PropTypes.arrayOf(Object).isRequired,
};

export default RecipesMealsCards;
