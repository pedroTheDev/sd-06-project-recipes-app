export const drinkApi = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchRandomDrink = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => (
    response
      .json()
      .then((json) => json.drinks[0])
      .catch((error) => error)
  ));
