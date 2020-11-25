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

export const foodCategoryApi = () => ( // requisito 27
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((response) => {
      const data = ['All'];
      const cinco = 5;
      const zero = 0;

      for (let i = zero; i < cinco; i += 1) {
        data.push(response.meals[i].strCategory);
      }
      return data;
    })
);

export const foodByCategoryApi = (category) => ( // requisito 28
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
