import { useState, useEffect } from 'react';

export default function useSearch() {
  const [filters, setFilters] = useState({
    searchText: '',
    searchType: '',
    category: 'food',
  });
  const [results, setResults] = useState();

  useEffect(() => {
    const { searchText, searchType, category } = filters;
    const api = (category === 'comidas')
      ? 'https://www.themealdb.com/api/json/v1/1/'
      : 'https://www.thecocktaildb.com/api/json/v1/1/';

    let endpoint = '';

    switch (filters.searchType) {
    case 'ingredient':
      endpoint = `filter.php?i=${filters.searchText}`;
      break;
    case 'name':
      endpoint = `search.php?s=${filters.searchText}`;
      break;
    case 'first-letter':
      endpoint = `search.php?f=${filters.searchText}`;
      break;
    default:
      break;
    }

    async function initSearch() {
      try {
        const dataJson = await fetch(`${api + endpoint}`);
        const data = await dataJson.json();
        setResults(data);
      } catch (error) {
        alert(error.message);
      }
    }

    if (searchText !== '' && searchType !== '') initSearch();
  }, [filters]);

  return [results, setFilters];
}
