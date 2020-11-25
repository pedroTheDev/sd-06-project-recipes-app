import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiFoodListCategories,
  requestApiFoodFilterCategories,
  requestApiFoodFilterName,
} from '../services/requestFood';

function ButtonCategoriesFood() {
  const {
    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [categoriesButton, setCategoriesButton] = useState([]);
  const [categorySelectPreviously, setCategorySelectPreviously] = useState([]);

  useEffect(() => {
    requestApiFoodListCategories()
      .then((arrayApiList) => {
        const arrayCategoriesList5 = arrayApiList.slice(0, 5)
          .map((objCategory) => objCategory.strCategory);
        const arrayListButton = ['All', ...arrayCategoriesList5];
        setCategoriesButton(arrayListButton);
      });
  }, []);

  const onClickCategory = async (category) => {
    if (category === 'All' || categorySelectPreviously === category) {
      const arrayApiName = await requestApiFoodFilterName();
      setCardFood(arrayApiName);
    } else {
      const arrayApiCategory = await requestApiFoodFilterCategories(category);
      setCardFood(arrayApiCategory);
    }
    setCategorySelectPreviously(category);
  };

  return (
    (categoriesButton.length === 0) ? <span>Loading...</span> : (
      <div>
        {categoriesButton.map((category) => (
          <button
            key={ category }
            type="button"
            data-testid={ `${category}-category-filter` }
            onClick={ () => onClickCategory(category) }
          >
            { category }
          </button>
        ))}
      </div>
    )
  );
}

export default ButtonCategoriesFood;
