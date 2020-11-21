// API ingredientes
async function ApiIngredient() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}');
  const json = await response.json();
  return json;
}

export default ApiIngredient;
