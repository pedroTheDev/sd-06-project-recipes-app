import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as cocktailAPI from '../../services/cocktailAPI';
import * as mealAPI from '../../services/mealAPI';

function RecipesPage() {
  const [type, setType] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [wLocation] = useState(window.location.href);
  const zero = 0;
  const five = 5;
  const twelve = 12;

  async function loadRecipes() {
    if (newFilter !== zero) {
      let temp = {};
      console.log('tipo de receita', type);
      if (type === 'cocktails') {
        if (filter !== '') {
          temp = await cocktailAPI.filterByCategory(filter);
        } else {
          temp = await cocktailAPI.searchByName('');
        }
        setRecipes(temp.drinks);
        setFilter(newFilter);
        setNewFilter(zero);
      } else if (type === 'meals') {
        if (filter !== '') {
          temp = await mealAPI.filterByCategory(filter);
        } else {
          temp = await mealAPI.searchByName('');
        }
        setRecipes(temp.meals);
        setFilter(newFilter);
        setNewFilter(zero);
      }
    }
  }

  async function loadCategories(arg) {
    if (arg === 'cocktails') {
      const temp = await cocktailAPI.listCategories();
      setCategories(temp.drinks);
    }
    if (arg === 'meals') {
      const temp = await mealAPI.listCategories();
      setCategories(temp.meals);
    }

    console.log('cat', categories);
  }

  async function changeFilter({ target }) {
    if (filter !== target.value) {
      setNewFilter(target.value);
      setRecipes([]);
    } else {
      setNewFilter('');
      setRecipes([]);
    }

    loadRecipes();
  }

  if (type === '') {
    if (wLocation === 'http://localhost:3000/comidas') {
      setType('meals');
      loadCategories('meals');
      console.log('categorias', type);
    } else if (wLocation === 'http://localhost:3000/bebidas') {
      setType('cocktails');
      loadCategories('cocktails');
    }
  }

  loadRecipes();

  if (recipes.length === zero || categories.length === zero) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div className="recipes-page">
      <div className="categories">
        <div className="category-button">
          <input
            type="button"
            data-testid="All-category-filter"
            value="All"
            onClick={ () => setNewFilter('') }
          />
        </div>
        {categories.map((category, index) => {
          const dataTestID = `${category.strCategory}-category-filter`;
          if (index < five) {
            if (type === 'cocktails') {
              return (
                <div className="category-button" key={ index }>
                  <input
                    type="button"
                    data-testid={ dataTestID }
                    value={ category.strCategory }
                    onClick={ changeFilter }
                  />
                </div>
              );
            }
            if (type === 'meals') {
              return (
                <div className="category-button" key={ index }>
                  <input
                    type="button"
                    data-testid={ dataTestID }
                    value={ category.strCategory }
                    onClick={ changeFilter }
                  />
                </div>
              );
            }
          }
          return (null);
        })}
      </div>
      <div className="recipes-section">
        {recipes.map((recipe, index) => {
          if (index < twelve) {
            const dataTestID = `${index}-recipe-card`;
            const dataTestIDImg = `${index}-card-img`;
            const dataTestIDCard = `${index}-card-name`;
            if (type === 'cocktails') {
              return (
                <Link key={ index } to={ `/bebidas/${recipe.idDrink}` }>
                  <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                    <img
                      alt="Drink Thumb"
                      data-testid={ dataTestIDImg }
                      src={ recipe.strDrinkThumb }
                      className="recipe-thumb"
                      height="250"
                    />
                    <h2
                      className="recipe-name"
                      data-testid={ dataTestIDCard }
                    >
                      {recipe.strDrink}
                    </h2>
                  </div>
                </Link>
              );
            }
            if (type === 'meals') {
              return (
                <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                  <div className="recipe-card" data-testid={ dataTestID } key={ index }>
                    <img
                      alt="Meal Thumb"
                      data-testid={ dataTestIDImg }
                      src={ recipe.strMealThumb }
                      className="recipe-thumb"
                      height="250"
                    />
                    <h2
                      className="recipe-name"
                      data-testid={ dataTestIDCard }
                    >
                      {recipe.strMeal}
                    </h2>
                  </div>
                </Link>
              );
            }
          }
          return (null);
        })}
      </div>
    </div>
  );
}

export default RecipesPage;
