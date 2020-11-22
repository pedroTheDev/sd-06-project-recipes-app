import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import useRequest from '../hooks/useRequest';

function Drink() {
  const { setHeader, filter, setFilter } = useContext(AppContext);
  const apiResponse = useRequest();

  const maxShow = 12;

  useEffect(() => {
    setFilter({ text: '', option: '' });
    setHeader({ page: 'Bebidas', search: true });
  }, []);

  return (
    <div>
      <Header />
      <div
        className="bodier"
        style={ { display: filter.option === '' ? 'none' : 'flex' } }
      >
        { apiResponse.length === 1
          ? <Redirect to={ `/bebidas/${apiResponse[0].idDrink}` } />
          : apiResponse.filter((e, index) => e && index < maxShow).map((drink, index) => (
            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
            >
              <h4
                className="text"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </h4>
              <img
                className="picture"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>))}
      </div>
      <Footer />
    </div>
  );
}

export default Drink;
