import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestDrinks, requestCategoryDrink, filterCategoryDrinks } from '../services/requestsAPI';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/RecipesContext';

function DrinksRecipesPage() {
  const [apiResult, setApiResult] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [curcategory, setCurcategory] = useState([]);
  const { hiddenInput } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchData() {
      const response = await requestDrinks();
      setApiResult(response);
      const categoryResults = await requestCategoryDrink();
      setDrinkCategory(categoryResults);
    }
    fetchData();
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
        { !hiddenInput ? apiResult.drinks && apiResult.drinks.slice(0, 12).map((element, idx) => (
          <DrinkCard element={element} idx={idx} key={element.idDrink} />)) : null }
      </div>

      <Footer />
    </div>
  );
}

export default DrinksRecipesPage;
