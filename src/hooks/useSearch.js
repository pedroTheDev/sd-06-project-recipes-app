import { useState, useEffect } from 'react';

export default function useSearch(props) {
  const [filters, setFilters] = useState({
    searchText: '',
    searchType: '',
    category: '',
  });
  const [results, setResults] = useState();

  useEffect(() => {
    const { searchText, searchType, category } = filters;
    const api = (category === 'food')
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
      const dataJson = await fetch(`${api + endpoint}`);
      const data = await dataJson.json();
      console.log(data);
      setResults(data);
    }

    if (searchText !== '' && searchType !== '') initSearch();
  }, [filters]);

  return [results, setFilters];
}
