import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiDrinkListCategories,
  requestApiDrinkFilterCategories,
  requestApiDrinkFilterName,
} from '../services/requestDrink';

function ButtonCategoriesDrink() {
  const {
    categories: {
      categoriesButtonDrink,
      setCategoriesButtonDrink,
    },
    cards: {
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const [categorySelectPreviously, setCategorySelectPreviously] = useState('');

  const ofTheFirstParameter = 0;
  const upToParameter5 = 5;
  useEffect(() => {
    if (categoriesButtonDrink.length === 0) {
      requestApiDrinkListCategories()
        .then((arrayApiList) => {
          const arrayCategoriesList5 = arrayApiList
            .slice(ofTheFirstParameter, upToParameter5)
            .map((objCategory) => objCategory.strCategory);
          const arrayListButton = ['All', ...arrayCategoriesList5];
          setCategoriesButtonDrink(arrayListButton);
        });
    }
  }, []);

  const onClickCategory = async (category) => {
    if (category === 'All' || categorySelectPreviously === category) {
      const arrayApiName = await requestApiDrinkFilterName();
      setCardDrink(arrayApiName);
      setCategorySelectPreviously('All');
    } else {
      const arrayApiCategory = await requestApiDrinkFilterCategories(category);
      setCardDrink(arrayApiCategory);
      setCategorySelectPreviously(category);
    }
  };

  const arrayVoid = 0;
  return (
    (categoriesButtonDrink.length === arrayVoid) ? <span>Loading...</span> : (
      <div>
        {categoriesButtonDrink.map((category) => (
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
