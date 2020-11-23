// API Nome
async function ApiName() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s={nome}');
  const json = await response.json();
  return json;
}

export default ApiName;
