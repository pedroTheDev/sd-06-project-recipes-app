import { useState, useEffect } from 'react';

export default function useSearch() {
  const [filters, setFilters] = useState({
    searchText: '',
    searchType: '',
  });
  const [results, setResults] = useState();

  useEffect(() => {
    const { searchText, searchType } = filters;
    const api = ('https://www.themealdb.com/api/json/v1/1/';

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
