import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

export default function Foods() {
  const { foods, fetchApi, searchParam, isLoading } = useContext(RevenueContext);
  const DOZE = 12;
  const ZERO = 0;

  useEffect(() => {
    if (searchParam === 'Meal') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else if (searchParam === 'Drink') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [searchParam]);

  const foodOrDrink = (searchParam === 'Meal') ? 'comidas' : 'bebidas';
  const idFirstPosition = (foods && foods.length !== ZERO)
    ? foods[0][`id${searchParam}`]
    : null;
  const renderFoodOrDrink = () => (
    <>
      {(foods && foods.length === 1)
        ? <Redirect to={ `/${foodOrDrink}/${idFirstPosition}` } /> : null}
      {foods && foods.map((food, index) => {
        const id = food[`id${searchParam}`];
        if (index < DOZE) {
          return (
            <Link to={ `/${foodOrDrink}/${id}` }>
              <div key={ id } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ food[`str${searchParam}Thumb`] }
                  alt={ food[`str${searchParam}`] }
                  data-testid={ `${index}-card-img` }
                  width="360px"
                />
                <div data-testid={ `${index}-card-name` }>
                  {food[`str${searchParam}`]}
                </div>
              </div>
            </Link>
          );
        }
        return '';
      })}
    </>
  );

  const renderIngredients = () => (
    <>
      {foods.map((food, index) => {
        if (index < DOZE) {
          return (
            <div key={ food.idIngredient }>
              <h3>{ food.strIngredient }</h3>
              <p>{food.strDescription}</p>
            </div>
          );
        }
        return '';
      })}
    </>
  );

  if (!isLoading) {
    return (
      <div>
        {(searchParam === 'Ingredients') ? renderIngredients() : renderFoodOrDrink()}
      </div>
    );
  }
  return <div>Loading...</div>;
}
