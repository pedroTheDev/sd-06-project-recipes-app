// const URLIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';

const fetchRecipes = async (URL) => {
  const result = await fetch(URL).then((response) => response.json());
  return result;
};

export default fetchRecipes;
