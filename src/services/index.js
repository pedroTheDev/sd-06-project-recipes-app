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
  const fetchDrinkByIngredient = await fetch(`${baseAPIDrinks}${endPointDrinkIngredient}${ingredient}`).then((response) => response.json());
  return fetchDrinkByIngredient;
};

export const getDrinkAPIByName = async (name) => {
  const fetchDrinkByName = await fetch(`${baseAPIDrinks}${endPointDrinkName}${name}`).then((response) => response.json());
  return fetchDrinkByName;
};

export const getDrinkAPIByFirstLetter = async (firstLetter) => {
  const fetchDrinkByFirstLetter = await fetch(`${baseAPIDrinks}${endPointDrinkFirstLetter}${firstLetter}`).then((response) => response.json());
  return fetchDrinkByFirstLetter;
};

export const getMealAPIByIngredient = async (ingredient) => {
  const fetchMealByIngredient = await fetch(`${baseAPIMeal}${endPointMealIngredient}${ingredient}`).then((response) => response.json());
  return fetchMealByIngredient;
};

export const getMealByName = async (name) => {
  const fetchMealByName = await fetch(`${baseAPIMeal}${endPointMealName}${name}`).then((response) => response.json());
  return fetchMealByName;
};

export const getMealByFirstLetter = async (firstLetter) => {
  const fetchMealByFirstLetter = await fetch(`${baseAPIMeal}${endPointMealFirstLetter}${firstLetter}`).then((response) => response.json());
  return fetchMealByFirstLetter;
};
