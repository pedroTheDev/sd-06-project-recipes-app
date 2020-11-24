import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from '../context/RevenueContext';

export default function Foods(props) {
  const { foods, fetchApi } = useContext(RevenueContext);
  const { url } = props;
  useEffect(() => {
    fetchApi(url);
  }, []);
  const DOZE = 12;
  console.log(foods);
  return (
    <div>
      {foods.map((food, index) => {
        if (index < DOZE) {
          return (
            <div key={ food.idDrink }>
              <img src={ food.strDrinkThumb } alt={ food.strDrink } width="360px" />
              {food.strDrink}
            </div>
          );
        }
        return '';
      })}
    </div>
  );
}

Foods.propTypes = {
  url: PropTypes.string.isRequired,
};
