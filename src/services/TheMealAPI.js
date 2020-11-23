const getMealInformation = async (endpoint) => {
  const fetchMealInformation = await fetch(endpoint);
  const mealInformation = await fetchMealInformation.json();
  return mealInformation;
};

export default getMealInformation;
