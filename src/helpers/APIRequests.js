export const fetchAPI = async (endpoint) => {
  let data = null;
  try {
    const response = await fetch(endpoint);
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  return data;
};

const urlRecipeTypes = {
  '/comidas': 'meal',
  '/bebidas': 'cocktail',
};

const checkInputlength = async (endPoint, text, fetchApi) => {
  if (text.length === 1) fetchApi(endPoint);
};

const fetchRecipesBySearchAttributes = (
  async (inputText, inputRadioSelection, recipeType) => {
    const ingredientsEndPoint = `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?i=${inputText}`;
    const nameEndPoint = `https://www.the${recipeType}db.com/api/json/v1/1/search.php?s=${inputText}`;
    const firstLetterEndPoint = `https://www.the${recipeType}db.com/api/json/v1/1/search.php?f=${inputText}`;
    const fetchTypes = {
      ingredients: () => fetchAPI(ingredientsEndPoint),
      name: () => fetchAPI(nameEndPoint),
      firstLetter: () => checkInputlength(firstLetterEndPoint, inputText, fetchAPI),
    };

    const fetchBytype = fetchTypes[inputRadioSelection];
    const response = await fetchBytype();

    return response;
  });

const fetchRecipesByUrl = async (url, inputText, inputRadioSelection) => {
  const recipeType = urlRecipeTypes[url];
  return fetchRecipesBySearchAttributes(inputText, inputRadioSelection, recipeType);
};

export default fetchRecipesByUrl;
