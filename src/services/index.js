const baseAPIDrinks = ('https://www.thecocktaildb.com/api/json/v1/1/');
const endPointDrinkIngredient = ('filter.php?i=');
const endPointDrinkName = ('search.php?s=');
const endPointDrinkFirstLetter = ('search.php?f=');

const baseAPIMeal = ('https://www.themealdb.com/api/json/v1/1/');
const endPointMealIngredient = ('filter.php?i=');
const endPointMealName = ('search.php?s=');
const endPointMealFirstLetter = ('search.php?f=');
const endPointCategoryList = ('list.php?c=list');
const endPointRandom = ('random.php');

export const fetchDrinkAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkIngredient}${ingredient}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByName = async (name) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkName}${name}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchDrinkAPIByFirstLetter = async (firstLetter) => {
  const response = await
  fetch(`${baseAPIDrinks}${endPointDrinkFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchMealAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealIngredient}${ingredient}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByName = async (name) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealName}${name}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealFirstLetter}${firstLetter}`);
  const json = await response.json();
  return json.meals;
};

export const fetchMealCategoryList = async () => {
  const response = await fetch(`${baseAPIMeal}${endPointCategoryList}`);
  const json = await response.json();
  return json.meals;
};

export const fetchDrinkCategoryList = async () => {
  const response = await fetch(`${baseAPIDrinks}${endPointCategoryList}`);
  const json = await response.json();
  return json.drinks;
};

export const fetchRandomMealId = async () => {
  const response = await fetch(`${baseAPIMeal}${endPointRandom}`);
  const { meals } = await response.json();
  return meals[0].idMeal;
};

export const fetchRandomDrinkId = async () => {
  const response = await fetch(`${baseAPIDrinks}${endPointRandom}`);
  const { drinks } = await response.json();
  return drinks[0].idDrink;
};
