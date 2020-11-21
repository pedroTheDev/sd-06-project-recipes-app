import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRequest from '../hooks/useRequest';

function Drink() {
  const { setHeader } = useContext(AppContext);
  const apiResponse = useRequest();
  const changeHeader = async () => {
    await setHeader({ page: 'Bebidas', search: true });
  };
  const maxShow = 12;

  useEffect(() => {
    changeHeader();
  }, []);

  return (
    <div>
      <Header />
       { apiResponse.length === 1
        ? <Redirect to={ `/bebidas/${apiResponse[0].idDrink}` } />
        : apiResponse.filter((e, index) => e && index < maxShow).map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Drink;
