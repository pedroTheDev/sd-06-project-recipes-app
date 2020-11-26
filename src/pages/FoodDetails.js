import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestDetailsFood } from '../services/requestsAPI';

function FoodDetails(props) {
  const { location: { state: { dataRecipes: { idMeal } } } } = props;
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');

  // async function handleRequisition() {
  //   const resultDetails = await requestDetailsFood(idMeal);
  //   setFoodDetails(resultDetails);
  // }
  console.log(foodDetails.meals);

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(idMeal);
      setFoodDetails(resultsDetails);
      const meal = resultsDetails.meals[0];
      const keysMeal = Object.keys(meal);
      const filterMeal = keysMeal.filter((key) => key.toLowerCase().includes('ingredient'));
      const filterMeasure = keysMeal.filter((key) => key.toLowerCase().includes('measure'));
      const allIngredients = filterMeal
        .map((item, index) => ({ ingredient: meal[item], measure: meal[filterMeasure[index]] }));
      setIngredients(allIngredients);
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
      {ingredients && ingredients.map((item, index) => (<p>{`${index} ${item.ingredient} - ${item.measure}`}</p>))}
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <h4 data-testid="recipe-category">{foodDetails.meals && foodDetails.meals[0].strCategory}</h4>

    </div>
  );
}

FoodDetails.propTypes = {
  location: PropTypes.arrayOf(Object).isRequired,
};

export default FoodDetails;
