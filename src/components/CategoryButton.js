import React, { useContext, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
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
  const { categories, fetchCategories, searchParam } = useContext(RevenueContext);
  // setSearchParam

  // const location = useLocation();
  // const idRecipe = location.pathname.split('/');
  // let foodOrDrink;
  // if (idRecipe[1] === 'comidas') {
  //   setSearchParam('Meal');
  //   foodOrDrink = 'Meals';
  // }
  // if (idRecipe[1] === 'bebidas') {
  //   setSearchParam('Drink');
  //   foodOrDrink = 'Drinks';
  // }

  const linkCategoriesAPI = (searchParam === 'Meal')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    fetchCategories(linkCategoriesAPI);
  }, []);

  console.log(categories);

  // const renderCategories = () => {
  //   if (categories[foodOrDrink]) {
  //     return (
  //       <div>
  //         <button
  //           type="button"
  //         >
  //           All
  //         </button>
  //         {categories[foodOrDrink].map((category, index) => {
  //           if (index < 5) {
  //             return (
  //               <button
  //                 key={ index }
  //                 data-testid={ `${index}-category-filter` }
  //                 type="button"
  //               >
  //                 {category.strCategory}
  //               </button>
  //             );
  //           }
  //         })}
  //       </div>
  //     );
  //   }
  //   return 'As categorias não foram carregadas';
  // };

  return (
    <div>
      {/* {(categories) ? renderCategories() : 'Loading...'} */}
    </div>
  );
}
