const getMeals = async (param) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/${param}`;
  const mealsApi = await fetch(endpoint);
  return mealsApi.json();
};

export default getMeals;
