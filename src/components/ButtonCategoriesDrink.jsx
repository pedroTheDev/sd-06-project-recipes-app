import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiDrinkListCategories,
  requestApiDrinkFilterCategories,
  requestApiDrinkFilterName,
} from '../services/requestDrink';

function ButtonCategoriesDrink() {
  const {
    cards: {
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const [categoriesButton, setCategoriesButton] = useState([]);
  const [categorySelectPreviously, setCategorySelectPreviously] = useState([]);

  useEffect(() => {
    requestApiDrinkListCategories()
      .then((arrayApiList) => {
        const arrayCategoriesList5 = arrayApiList.slice(0, 5)
          .map((objCategory) => objCategory.strCategory);
        const arrayListButton = ['All', ...arrayCategoriesList5];
        setCategoriesButton(arrayListButton);
      });
  }, []);

  const onClickCategory = async (category) => {
    if (category === 'All' || categorySelectPreviously === category) {
      const arrayApiName = await requestApiDrinkFilterName();
      setCardDrink(arrayApiName);
    } else {
      const arrayApiCategory = await requestApiDrinkFilterCategories(category);
      setCardDrink(arrayApiCategory);
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

export default ButtonCategoriesDrink;
