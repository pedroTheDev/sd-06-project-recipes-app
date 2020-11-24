import React, { useContext, useEffect } from 'react';
import RevenueContext from '../context/RevenueContext';
// import fetchApi from '../services/FetchApi';

export default function Foods() {
  const { foods, fetchApi, searchParam, setFoods } = useContext(RevenueContext);
  const DOZE = 12;
  const ZERO = 0;
  const dataLengthTest = () => {
    if (foods.length === ZERO) {
      // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return <div>Sinto muito, não encontramos nenhuma receita para esses filtros.</div>;
    }
  };
  useEffect(() => {
    if (searchParam === 'Meal') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(() => dataLengthTest());
    } else if (searchParam === 'Drink') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then(() => dataLengthTest());
    }
    setFoods([]);
  }, []);

  console.log(foods);
  if (foods.length > ZERO) {
    return (
      <div>
        {foods.map((food, index) => {
          if (index < DOZE) {
            console.log(food[`str${searchParam}`]);
            return (
              <div key={ food[`id${searchParam}`] }>
                <img
                  src={ food[`str${searchParam}Thumb`] }
                  alt={ food[`str${searchParam}`] }
                  width="360px"
                />
                {food[`str${searchParam}`]}
              </div>
            );
          }
          return '';
        })}
      </div>);
  }
  return <div>Sinto muito, não encontramos nenhuma receita para esses filtros.</div>;
}
