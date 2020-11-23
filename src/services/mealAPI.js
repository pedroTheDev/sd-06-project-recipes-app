const getMealInformation = async (endpoint) => {
  const mealInformation = await fetch(endpoint);
  return mealInformation;
};

export default getMealInformation;
