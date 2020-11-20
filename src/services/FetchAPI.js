function fetchMeal(endPoint, value) {
  let variavel;
  if (value === 'ingrediente') {
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

export default fetchMeal;
