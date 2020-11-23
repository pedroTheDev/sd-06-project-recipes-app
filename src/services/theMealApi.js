export default getMeals = async () => {
  const endpoint = '';
  const mealsApi = await fetch(endpoint);
  return mealsApi.json();
};
