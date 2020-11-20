export const fetchAPIRecipes = async (selectedRadio, endPoint) => {
  console.log('FETCH!!');
  let apiResponse = '';

  if (selectedRadio === 'ingredient') {
    console.log('INGREDIENT');
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`);
    apiResponse = await apiRequest.json();
    // console.log('Resposta da API: ', apiResponse);
  } else if (selectedRadio === 'name') {
    console.log('NAME');
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else {
    console.log('FIRST LETTER');
    if (endPoint.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      // return undefined;
    }
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`);
    apiResponse = await apiRequest.json();
  }
  return (apiResponse.meals);
};

export const fetchAPIDrinks = async (selectedRadio, endPoint) => {
  let apiResponse = '';

  if (selectedRadio === 'ingredient') {
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`);
    apiResponse = await apiRequest.json();
    // console.log('Resposta da API: ', apiResponse);
  } else if (selectedRadio === 'name') {
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else {
    if (endPoint.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      // return undefined;
    }
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`);
    apiResponse = await apiRequest.json();
  }
  return (apiResponse.drinks);
};
