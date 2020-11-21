import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRequest from '../hooks/useRequest';

function Food() {
  const { setHeader, filter } = useContext(AppContext);
  const apiResponse = useRequest();
  const changeHeader = async () => {
    await setHeader({ page: 'Comidas', search: true });
  };
  const maxShow = 12;

  useEffect(() => {
    changeHeader();
  }, []);

  return (
    <div>
      <Header />
      {apiResponse.length === 1
        ? <Redirect to={ `/comidas/${apiResponse[0].idMeal}` } />
        : apiResponse.filter((e, index) => e && index < maxShow).map((meal, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
            <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Food;
