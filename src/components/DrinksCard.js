import React, { useContext } from 'react';

import BebidaCard from './BebidaCard';

import ReceitasContext from '../context/ReceitasContext';

function DrinksCard() {
  const { meals } = useContext(ReceitasContext);
  const doze = 12;
  return (
    <div>
      {meals
        .filter((x, index) => index < doze)
        .map((drink, i) => (
          <BebidaCard key={ drink } drink={ drink } index={ i } />
        ))}
    </div>
  );
}

export default DrinksCard;
