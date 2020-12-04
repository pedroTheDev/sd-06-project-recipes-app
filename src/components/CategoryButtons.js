import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import fetchCategories from '../services/categoriesAPI';
import getRecipesInformation from '../services/recipesAPI';
import './CategoryButtons.css';

function CategoryButtons({ type }) {
  const {
    setFetchedResults,
    setIsFetching,
    selectedCategory,
    setSelectedCategory,
  } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const categoriesButtons = async () => {
    const fetchedCategories = await fetchCategories(type);
    setCategories(fetchedCategories);
    setIsFetchingCategories(false);
  };

  const defaultRecipes = async () => {
    let url = '';
    if (type === 'meals') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else if (type === 'drinks') {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    const recipes = await getRecipesInformation(url);
    setFetchedResults(recipes);
    setIsFetching(false);
  };

  const handleCategorySelection = async ({ target: { name } }) => {
    let endpoint = '';

    if ((selectedCategory === name) || (selectedCategory !== name && name === 'all')) {
      setSelectedCategory('all');
      return defaultRecipes();
    }

    if (type === 'meals') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
      setSelectedCategory(name);
    } else if (type === 'drinks') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
      setSelectedCategory(name);
    }

    setIsFetching(true);
    const recipes = await getRecipesInformation(endpoint);
    setFetchedResults(recipes);
    setIsFetching(false);
  };

  useEffect(() => {
    categoriesButtons();
  }, []);

  return (
    <div>
      {
        isFetchingCategories
          ? <p>Carregando Categorias</p>
          : categories.map((category) => (
            <button
              type="button"
              onClick={ handleCategorySelection }
              name={ category.strCategory }
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              className="category"
            >
              { category.strCategory }
            </button>
          ))
      }
      {
        !isFetchingCategories
        && (
          <button
            type="button"
            onClick={ handleCategorySelection }
            name="all"
            key="all"
            data-testid="All-category-filter"
            className="category"
          >
            All
          </button>
        )
      }
    </div>
  );
}

CategoryButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryButtons;
