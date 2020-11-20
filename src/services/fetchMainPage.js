const fetchMainPage = (foodOrDrink) => {
  console.log(foodOrDrink)
  const foods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  if (foodOrDrink === '/comidas') {
    console.log('if')
    return fetch(foods).then((response) => (response.json()));
  }
  return fetch(drinks).then((response) => (response.json()))
};

export default fetchMainPage;
