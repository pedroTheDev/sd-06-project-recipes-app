export default async function FetchApiComidas(filtro, value) {
  if (filtro === '1') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.meals;
  } if (filtro === '2') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.meals;
  } if (filtro === '3') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.meals;
  }
}
