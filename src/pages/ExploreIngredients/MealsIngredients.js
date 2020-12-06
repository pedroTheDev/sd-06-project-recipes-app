import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import MealsIngredientCard from '../../components/MealsIngredientCard';
import { fetchMeal } from '../../services/mealAPI';

function MealsIngredients() {
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const maxCards = 12;
  const zero = 0;

  const fetchMealsIngredients = async () => {
    const listIngredients = await fetchMeal('listIngredient', '');
    setMealsIngredients(listIngredients.meals);
  };

  useEffect(() => {
    fetchMealsIngredients();
  }, []);

  if (Object.keys(mealsIngredients).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
      {
        mealsIngredients.slice(zero, maxCards)
          .map((ingredient, index) => (
            <MealsIngredientCard
              id={ ingredient.idIngredient }
              key={ index }
              ingredient={ ingredient }
              index={ index }
            />
          ))
      }
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default MealsIngredients;
