import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestDrinks, requestCategoryDrink, filterCategoryDrinks } from '../services/requestsAPI';
import DrinkCard from '../components/DrinkCard';

function DrinksRecipesPage() {
  const [apiResult, setApiResult] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [curcategory, setCurcategory] = useState([]);

  useEffect(async () => {
    const response = await requestDrinks();
    setApiResult(response);
    const categoryResults = await requestCategoryDrink();
    setDrinkCategory(categoryResults);
  }, []);

  async function handleClick(e) {
    const category = e.target.value;
    if (curcategory === category) {
      setCurcategory(category);
    }

    const filteredCategory = await filterCategoryDrinks(category);

    setApiResult(filteredCategory);
  }
  console.log(drinkCategory);
  return (
    <div>
      <Header pageName="Bebidas" />

      <div>
        <button type="button">All</button>

        {drinkCategory.drinks && drinkCategory.drinks.slice(0, 5).map((element) => (
          <button onClick={(e) => handleClick(e)} value={element.strCategory} type="button" data-testid={`${element.strCategory}-category-filter`}>{element.strCategory}</button>
        ))}
      </div>
      <div>
        {apiResult.drinks && apiResult.drinks.slice(0, 12).map((element, idx) => (
          <DrinkCard element={element} idx={idx} key={element.idDrink} />))}
      </div>

      <Footer />
    </div>
  );
}

export default DrinksRecipesPage;
