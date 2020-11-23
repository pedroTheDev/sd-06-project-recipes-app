// Usado API "Liste todas as categorias de refeições - "List all meal categories"
async function ApiPageFoods() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const json = await response.json();
  return json;
}

export default ApiPageFoods;
