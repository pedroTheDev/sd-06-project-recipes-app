async function fetchMeal(filter, searchTerm) {
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  switch (filter) {
  case 'ingredient': {
    const fetchByIngredient = await fetch(`${url}filter.php?i=${searchTerm}`);
    const ingredientResponse = await fetchByIngredient.json();
    return ingredientResponse.meals;
  }

  case 'name': {
    const fetchByName = await fetch(`${url}search.php?s=${searchTerm}`);
    const nameResponse = await fetchByName.json();
    return nameResponse.meals;
  }

  case 'firstLetter': {
    const fetchByFirstLetter = await fetch(`${url}search.php?f=${searchTerm}`);
    const firstLetterResponse = await fetchByFirstLetter.json();
    return firstLetterResponse.meals;
  }

  default:
  }
}

export default fetchMeal;
