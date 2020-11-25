import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestFoods, requestCategoryFood, filterCategoryFood } from '../services/requestsAPI';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

function FoodRecipesPage() {
  const [apiResult, setApiResult] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const { hiddenInput } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchData() {
      const foodResults = await requestFoods();
      setApiResult(foodResults);
      const categoryResults = await requestCategoryFood();
      setFoodCategory(categoryResults);
    }
    fetchData();
  }, []);

  async function handleClick(e) {
    const category = e.target.value;

    const filteredCategory = await filterCategoryFood(category);

    setApiResult(filteredCategory);
  }
  return (
    <div>
      <Header pageName="Comidas" />
      <div />

      <div>
        <button type="button">All</button>
        {foodCategory.meals && foodCategory.meals.slice(0, 5).map((element) => (
          <button onClick={(e) => handleClick(e)} value={element.strCategory} type="button" data-testid={`${element.strCategory}-category-filter`}>{element.strCategory}</button>
        ))}

      </div>
      <div>
        { !hiddenInput ? apiResult.meals && apiResult.meals.slice(0, 12).map((element, idx) => (
          <FoodCard element={element} idx={idx} key={element.idMeal} />)) : null }
      </div>

      <Footer />
    </div>
  );
}

export default FoodRecipesPage;
