const fetch = require('node-fetch');

const baseAPIDrinks = ('https://www.thecocktaildb.com/api/json/v1/1/');
const endPointDrinkIngredient = ('filter.php?i=');
const endPointDrinkName = ('search.php?s=');
const endPointDrinkFirstLetter = ('search.php?f=');

const baseAPIMeal = ('https://www.themealdb.com/api/json/v1/1/');
const endPointMealIngredient = ('filter.php?i=');
const endPointMealName = ('search.php?s=');
const endPointMealFirstLetter = ('search.php?f=');

export const getDrinkAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkIngredient}${ingredient}`);
  const fetchDrinkByIngredient = await response.json();
  return fetchDrinkByIngredient;
};

export const getDrinkAPIByName = async (name) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkName}${name}`);
  const fetchDrinkByName = await response.json();
  return fetchDrinkByName;
};

export const getDrinkAPIByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${baseAPIDrinks}${endPointDrinkFirstLetter}${firstLetter}`);
  const fetchDrinkByFirstLetter = await response.json();
  return fetchDrinkByFirstLetter;
};

export const getMealAPIByIngredient = async (ingredient) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealIngredient}${ingredient}`);
  const fetchMealByIngredient = await response.json();
  return fetchMealByIngredient;
};

export const getMealByName = async (name) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealName}${name}`);
  const fetchMealByName = await response.json();
  return fetchMealByName;
};

export const getMealByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${baseAPIMeal}${endPointMealFirstLetter}${firstLetter}`);
  const fetchMealByFirstLetter = await response.json();
  return fetchMealByFirstLetter;
};
