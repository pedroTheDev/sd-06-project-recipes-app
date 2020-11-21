export default async function FetchApiComidas(filtro, value, setData) {
  if (filtro === 'ingrediente') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  } else if (filtro === 'nome') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  } else if (filtro === 'primeira-letra') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  }
}
