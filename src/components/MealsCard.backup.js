import React, { useContext } from 'react';

import ComidaCard from '../components/ComidaCard';

import ReceitasContext from '../context/ReceitasContext';

function MealsCard() {
  const { meals } = useContext(ReceitasContext);
  const doze = 12;
  return (
    <div>
      {meals.filter((x, index) => index < doze)
        .map((food, i) => (<ComidaCard key={ food } food={ food } index={ i } />
        ))}
    </div>
  );
}

export default MealsCard;
