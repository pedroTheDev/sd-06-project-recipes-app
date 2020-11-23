import React, { useContext, useEffect, useState } from 'react';

import RecipesContext from '../context/RecipesContext';

function MainFoodCard() {
  const {
    FoodApi,
    fetchFood,
    FoodButton,
    FoodBtn,
    filterFood,
    FoodCategory,
    setFilterFood } = useContext(RecipesContext);

  useEffect(() => {
    FoodApi();
    FoodButton();
  }, []);

  const [targetName, setTargetName] = useState('');
  const inicio = 0;
  const fim = 12;
  const btn = 5;

  const handleClick = ({ target }) => {
    const filter = target.name;
    if (targetName === filter) {
      setFilterFood([]);
    }
    if (targetName !== filter) {
      FoodCategory(filter);
      setTargetName(filter);
    }
  };
  const filterAll = () => {
    setFilterFood([]);
  };
  console.log(filterFood);
  if (filterFood.length > inicio) {
    return (
      <main>
        <section>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => filterAll() }
          >
            All
          </button>
          {FoodBtn.map((el, idx) => (
            <button
              type="button"
              key={ idx }
              data-testid={ `${el.strCategory}-category-filter` }
              name={ el.strCategory }
              onClick={ (e) => handleClick(e) }
            >
              {el.strCategory}
            </button>)).slice(inicio, btn) }
        </section>
        <section>
          {filterFood.map((el, idx) => (
            <div
              key={ idx }
              data-testid={ `${idx}-recipe-card` }
            >
              <p data-testid={ `${idx}-card-name` }>{el.strMeal}</p>
              <a
                href={ `/comidas/${el.idMeal}` }
              >
                <img
                  data-testid={ `${idx}-card-img` }
                  src={ el.strMealThumb }
                  alt="food-pic"
                />
              </a>
            </div>
          )).splice(inicio, fim)}
        </section>
      </main>
    );
  }
  return (
    <main>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterAll() }
        >
          All
        </button>
        {FoodBtn.map((el, idx) => (
          <button
            type="button"
            key={ idx }
            data-testid={ `${el.strCategory}-category-filter` }
            name={ el.strCategory }
            onClick={ (e) => handleClick(e) }
          >
            {el.strCategory}
          </button>)).slice(inicio, btn) }
      </section>
      <section>
        {fetchFood.map((el, idx) => (
          <div
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
          >
            <p data-testid={ `${idx}-card-name` }>{el.strMeal}</p>
            <a
              href={ `/comidas/${el.idMeal}` }
            >
              <img
                data-testid={ `${idx}-card-img` }
                src={ el.strMealThumb }
                alt="food-pic"
              />
            </a>
          </div>
        )).splice(inicio, fim)}
      </section>
    </main>
  );
}

export default MainFoodCard;
