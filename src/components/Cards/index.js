import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Cards = () => {
  const { apiValueSearch } = useContext(ContextAPI);

  return (
    <div>
      {apiValueSearch.results && (
        apiValueSearch.results.meals.map((res) => (
          <div key={res.strMeal}>
            <p>{res.strMeal}</p>
            <img src={res.strMealThumb} alt={res.strMeal} />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
