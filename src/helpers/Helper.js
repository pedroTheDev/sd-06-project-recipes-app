export async function fetchMealRecipe(id) {
  const dataJson = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await dataJson.json();
  return data;
}

export function blablabla(params) {
  return params;
}
