import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestDetailsFood } from '../services/requestsAPI';

function FoodDetails(props) {
  const { location: { state: { dataRecipes: { idMeal } } } } = props;
  const [foodDetails, setFoodDetails] = useState([]);

  // async function handleRequisition() {
  //   const resultDetails = await requestDetailsFood(idMeal);
  //   setFoodDetails(resultDetails);
  // }
  console.log(foodDetails.meals);

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(idMeal);
      setFoodDetails(resultsDetails);
    }
    fetchData();
    // const results = await handleRequisition();
    // setFoodDetails(results);
    // console.log(foodDetails);
  }, []);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        width="100px"
        src={foodDetails.meals && foodDetails.meals[0].strMealThumb}
        alt="Meal"
      />
      <h3 data-testid="recipe-title">{foodDetails.meals && foodDetails.meals[0].strMeal}</h3>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <h4 data-testid="recipe-category">{foodDetails.meals && foodDetails.meals[0].strCategory}</h4>
      {foodDetails.meals && foodDetails.meals.filter((ingredient) => ingredient.match(/strIngredient/))}
    </div>
  );
}

FoodDetails.propTypes = {
  location: PropTypes.arrayOf(Object).isRequired,
};

export default FoodDetails;
