import React, { useContext } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';

function DetalhesBebida() {
  const { drinks } = useContext(ReceitasContext);
  const doze = 12;
  return (
    <div>
      {drinks.drinks
        .filter((x, index) => index < doze)
        .map((drink, i) => (
          <DrinksCard key={ drink } drink={ drink } index={ i } />
        ))}
    </div>
  );
}

export default DetalhesBebida;
