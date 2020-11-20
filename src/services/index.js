// const URLIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';

const fetchRecipes = (URL) => {
  fetch(URL).then((response) => response.json());
};

export default fetchRecipes;
