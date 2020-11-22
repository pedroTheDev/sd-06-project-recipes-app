const fetchAPI = async (endpoint) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

const checkInputlength = async (firstLetter, text) => (text.length > 1
  ? alert('Sua busca deve conter somente 1 (um) caracter') : fetchAPI(firstLetter));

const fetchFoodRecipes = async (text, searchType) => {
  const ingredientsEndPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`;
  const nameEndPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
  const firstLetterEndPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
  const fetchTypes = {
    ingredients: () => fetchAPI(ingredientsEndPoint),
    name: () => fetchAPI(nameEndPoint),
    firstLetter: () => checkInputlength(firstLetterEndPoint, text),
  };

  const response = await fetchTypes[searchType]();
  return response;
};

const fetchCocktailRecipes = async (text, searchType) => {
  const ingredientsEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
  const nameEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
  const firstLetterEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
  const fetchTypes = {
    ingredients: () => fetchAPI(ingredientsEndPoint),
    name: () => fetchAPI(nameEndPoint),
    firstLetter: () => checkInputlength(firstLetterEndPoint, text),
  };

  const response = await fetchTypes[searchType]();
  return response;
};

const fetchRecipes = async (url, text, searchType) => {
  if (url === '/comidas') return fetchFoodRecipes(text, searchType);
  if (url === '/bebidas') return fetchCocktailRecipes(text, searchType);
};

export default fetchRecipes;
