async function drinkAPI(type, endpoint) {
  let url;

  switch (type) {
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endpoint}`;
    break;
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endpoint}`;
    break;
  case 'first-letter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endpoint}`;
    break;
  default:
    return url;
  }

  const fetchAPI = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .catch((error) => {
      console.log(`Deu erro: ${error.message}`);
    });

  return fetchAPI;
}

export default drinkAPI;

export const fetchRandomDrink = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => (
    response
      .json()
      .then((json) => json.drinks[0])
      .catch((error) => error)
  ));
