import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drink() {
  const { setHeader, apiResponse } = useContext(AppContext);
  useEffect(async () => {
    await setHeader({ page: 'Bebidas', search: true });
  }, []);
  return (
    <div>
      <Header />
      { [...apiResponse].length === 1
        ? <Redirect to={ `/bebidas/${apiResponse[0].idDrink}` } />
        : apiResponse.map((drink) => (
          <div key={ drink.idDrink }>
            <h4>{drink.strDrink}</h4>
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
          </div>
        ))}
    </div>
  );
}

export default Drink;
