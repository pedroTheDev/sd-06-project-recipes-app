import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import MealsCard from '../components/MealsCard';

function DetalhesComida() {
  const { foods } = useContext(ReceitasContext);
  const doze = 12;

  return (
    <div>
      {foods.meals
        .filter((x, index) => index < doze)
        .map((food, i) => (
          <MealsCard key={ food } food={ food } index={ i } />
        ))}
    </div>
  );
}

export default DetalhesComida;
