import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientCard from '../../components/IngredientCard';
import { fetchMeal } from '../../services/mealAPI';

function ExploreIngredients() {
  const [mealsIngredient, setmealsIngredient] = useState([]);
  // const [images, setImages] = useState('');
  const maxCards = 12;
  const zero = 0;
  const location = useLocation();
  console.log(location.pathname);

  const fetchIngredients = async () => {
    const listIngredients = await fetchMeal('listIngredient', '');
    console.log('fetch ingredients', listIngredients);
    setmealsIngredient(listIngredients.meals);
  };

  /*   const handleIngredients = () => {
    const ingredientsName = mealsIngredient.map((ingredient) => ingredient.strIngredient);
    return ingredientsName;
  };
  console.log(handleIngredients()); */

  /* const fetchImage = async (ingredient) => {
    const saveImage = await fetchImage(ingredient);
    setImages(saveImage);
  }; */

  useEffect(() => {
    fetchIngredients();
  // handleIngredients();
  // fetchImage();
  }, []);

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
      <div className="ingredients-area">
        {
          mealsIngredient.slice(zero, maxCards)
            .map((ingredient, index) => (
              <IngredientCard
                key={ index }
                ingredient={ ingredient }
              />
            ))
        }
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreIngredients;
