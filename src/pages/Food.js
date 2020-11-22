import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRequest from '../hooks/useRequest';

function Food() {
  const { setHeader, filter, setFilter } = useContext(AppContext);
  const apiResponse = useRequest();
  const maxShow = 12;

  useEffect(() => {
    setFilter({ text: '', option: '' });
    setHeader({ page: 'Comidas', search: true });
  }, []);

  return (
    <div>
      <Header />
      <div
        className="bodier"
        style={ { display: filter.option === '' ? 'none' : 'flex' } }
      >
        {apiResponse.length === 1
          ? <Redirect to={ `/comidas/${apiResponse[0].idMeal}` } />
          : apiResponse.filter((e, index) => e && index < maxShow).map((meal, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
            >
              <h4
                className="text"
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </h4>
              <img
                className="picture"
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Food;
