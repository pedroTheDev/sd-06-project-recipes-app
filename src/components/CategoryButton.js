import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

// 01. Devem ser exibidas apenas as 5 primeiras categorias retornadas da API.

// 02. Caso as receitas sejam de comida,
// deve-se exibir as 5 primeiras categorias de comida obtidas através do
// endpoint https://www.themealdb.com/api/json/v1/1/list.php?c=list;

// 03. Caso as receitas sejam de bebida,
// deve-se exibir as 5 primeiras categorias de bebida obtidas através do
// endpoint https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list.

// deve-se carregar as 12 primeiras receitas de cada categoria

export default function CategoryButton() {
  const { foods, categories, fetchCategories, searchParam,
    setSearchParam, fetchByCategory, fetchApi } = useContext(RevenueContext);

  const location = useLocation();
  const idRecipe = location.pathname.split('/');
  let foodOrDrink;
  if (idRecipe[1] === 'comidas') {
    setSearchParam('Meal');
    foodOrDrink = 'meals';
  }
  if (idRecipe[1] === 'bebidas') {
    setSearchParam('Drink');
    foodOrDrink = 'drinks';
  }

  let generalAPI;
  let linkCategoriesAPI;
  let linkByCategoryAPI;
  if (searchParam === 'Meal') {
    generalAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    linkCategoriesAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    linkByCategoryAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  } else {
    generalAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    linkCategoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    linkByCategoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  }

  useEffect(() => {
    fetchCategories(linkCategoriesAPI);
  }, [searchParam, foods]);

  const renderCategories = () => {
    if (categories[foodOrDrink]) {
      const CINCO = 5;
      return (
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          <button
            className="category-buttons"
            type="button"
            onClick={ () => fetchApi(generalAPI) }
            data-testid="All-category-filter"
          >
            All
          </button>
          {categories[foodOrDrink].map((category, index) => {
            if (index < CINCO) {
              const linkAPI = `${linkByCategoryAPI}${category.strCategory}`;
              return (
                <button
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  className="category-buttons"
                  type="button"
                  onClick={ () => fetchByCategory(linkAPI) }
                >
                  {category.strCategory}
                </button>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return 'As categorias não foram carregadas';
  };

  return (
    <div>
      {(categories) ? renderCategories() : 'Loading...'}
    </div>
  );
}
