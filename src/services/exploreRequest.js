export const getAPI = async () => {
  const ZERO = 0;
  const TWELVE = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  console.log('teste', response);
  const json = await response.json();
  const results = await json.meals;
  await setFoodIngredientsCategory(results.slice(ZERO, TWELVE));
};