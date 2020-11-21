export function fetchMeal(endPoint, id) {
  let variavel;
  if (id === 'ingrediente') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (id === 'nome') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (id === 'primeira-letra') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  }
  return variavel;
}

export function fetchDrinks(endPoint, value) {
  let variavel;
  if (endPoint.length < 1) {
    variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon')
      .then((response) => response.json())
      .then((response) => response.drinks);
  } else if (value === 'ingrediente') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks);
  } else if (value === 'nome') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks);
  } else if (value === 'primeira-letra') {
    variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.drinks);
  }
  return variavel;
}
