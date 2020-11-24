const getMealInformation = async (endpoint) => {
  const mealInformation = await fetch(endpoint);
  const mealInformationJason = await mealInformation.json();

  return mealInformationJason;
};

export default getMealInformation;
