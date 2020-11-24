export async function foodAPI(type, endpoint) {
  let url;

  switch (type) {
  case 'ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${endpoint}`;
    break;
  case 'name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${endpoint}`;
    break;
  case 'first-letter':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${endpoint}`;
    break;
  default:
    url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  }

  const fetchAPI = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals)
    .catch((error) => {
      console.log(`Deu erro: ${error.message}`);
    });

  return fetchAPI;
}

export const fetchRandomMeal = () => fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => (
    response
      .json()
      .then((json) => json.meals[0])
      .catch((error) => error)
  ));
