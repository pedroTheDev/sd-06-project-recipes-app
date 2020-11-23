export default async function fetchApiDrink(radioSelected, value, setData) {
  if (radioSelected === '1') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  } else if (radioSelected === '2') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  } else if (radioSelected === '3') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    setData(responseJson);
  }
}
