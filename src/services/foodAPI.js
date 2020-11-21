function formatInput(input) {
  const str = input.replace(/\s+/g, '_').toLowerCase();
  return str;
}

async function fetchMealAPI(option, input) {
  const formatedString = formatInput(input);
  let endPoint = '';
  let url = '';

  if (option === 'search-name' || option === 'first-letter') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?';
    endPoint = option === 'search-name' ? `s=${input}` : `f=${input[0]}`;
  } else if (option === 'search-ingredient') {
    url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    endPoint = `i=${formatedString}`;
  }

  const response = await fetch(`${url}${endPoint}`);
  const dataInfo = await response.json();
  return dataInfo;
}

export default fetchMealAPI;
