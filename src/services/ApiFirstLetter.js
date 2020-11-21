// API Primeira Letra"
async function ApiFirstLetter() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}');
  const json = await response.json();
  return json;
}

export default ApiFirstLetter;
