const fetchCategories = async (type) => {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const quantityCategoriesNeeded = 4;
  let fiveFirstCategories = [];

  if (type === 'meals') {
    const categoriesResponse = await fetch(mealsURL);
    const categories = await categoriesResponse.json();
    fiveFirstCategories = categories.meals
      .filter((_category, index) => (index <= quantityCategoriesNeeded));
  } else if (type === 'drinks') {
    const categoriesResponse = await fetch(drinksURL);
    const categories = await categoriesResponse.json();
    fiveFirstCategories = categories.drinks
      .filter((_category, index) => (index <= quantityCategoriesNeeded));
  }

  return fiveFirstCategories;
};

export default fetchCategories;
