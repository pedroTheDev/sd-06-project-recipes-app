export function fetchMeal(endPoint, value) {
  let variavel;
  if (endPoint.length < 1) {
    variavel = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=cheese')
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'ingrediente') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'nome') {
    variavel = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`)
      .then((response) => response.json())
      .then((response) => response.meals);
  } else if (value === 'primeira-letra') {
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

export function fetchDrinksById(endPoint) {
  const variavel = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.drinks);
  return variavel;
}

export function fetchRecommendedDrinks() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 6;
  const variavel = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.drinks.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}

export function fetchMealsById(endPoint) {
  const variavel = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${endPoint}`)
    .then((response) => response.json())
    .then((response) => response.meals);
  return variavel;
}

export function fetchRecommendedMeals() {
  const INITIAL_LENGTH = 0;
  const MAX_LENGTH = 6;
  const variavel = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((response) => response.meals.slice(INITIAL_LENGTH, MAX_LENGTH));
  return variavel;
}
