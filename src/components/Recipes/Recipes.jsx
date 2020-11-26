import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import CategoryDisplay from '../CategoryDisplay/CategoryDisplay';
import RecipeCard from '../RecipeCard';
import './Recipes.css';

const Recipes = () => {
  const {
    pageTitle,
    recipes,
    setRecipes,
    setLoading,
    selectedCategory,
  } = useContext(Context);

  const [newRecipes, setNewRecipes] = useState([]);

  useEffect(() => {
    if (pageTitle === 'Comidas') {
      setLoading(true);
      getMealsAPI().then((data) => {
        console.log(data);
        setRecipes(data);
        setLoading(false);
      });
    } else if (pageTitle === 'Bebidas') {
      setLoading(true);
      getDrinksApi().then((data) => {
        setRecipes(data);
        setLoading(false);
      });
    }
  }, [pageTitle]);

  useEffect(() => {
    if (selectedCategory !== '' && pageTitle === 'Comidas') {
      setLoading(true);
      getMealsAPI(`c=${selectedCategory}`, 'byCategory').then((data) => {
        setNewRecipes(data);
        setLoading(false);
      });
    } else if (selectedCategory !== '' && pageTitle === 'Bebidas') {
      setLoading(true);
      getDrinksApi(`c=${selectedCategory}`, 'byCategory').then((data) => {
        setNewRecipes(data);
        setLoading(false);
      });
    }
  }, [selectedCategory]);

  function renderCards() {
    if (recipes) {
      const MAX_CARDS = 11;
      if (selectedCategory === '') {
        return (
          recipes.map((recipe, index) => {
            while (index <= MAX_CARDS) {
              return (
                <RecipeCard
                  key={ recipe.idMeal || recipe.idDrink }
                  recipe={ recipe }
                  index={ index }
                  alt={ pageTitle }
                />
              );
            }
            return undefined;
          })
        );
      }
      if (selectedCategory !== '') {
        return (
          newRecipes.map((recipe, index) => {
            while (index <= MAX_CARDS) {
              return (
                <RecipeCard
                  key={ recipe.idMeal || recipe.idDrink }
                  recipe={ recipe }
                  index={ index }
                />
              );
            }
            return undefined;
          })
        );
      }
    }
    return undefined;
  }

  return (
    <div className="wrapper">
      <CategoryDisplay />
      <div className="recipes-container">
        { renderCards() }
      </div>
    </div>
  );
};

export default Recipes;
