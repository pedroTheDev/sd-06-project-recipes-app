import { useEffect, useContext } from 'react';
import RecipesContext from '../context/Context';

export default function useSearch() {
  const { filters, setItems, setFilters } = useContext(RecipesContext);

  const initSearch = async () => {
    try {
      const { searchText, searchType, category } = filters;
      const api = (category === 'comidas')
        ? 'https://www.themealdb.com/api/json/v1/1/'
        : 'https://www.thecocktaildb.com/api/json/v1/1/';

      let endpoint = '';

      switch (searchType) {
      case 'ingredient':
        endpoint = `filter.php?i=${searchText}`;
        break;
      case 'name':
        endpoint = `search.php?s=${searchText}`;
        break;
      case 'first-letter':
        endpoint = `search.php?f=${searchText}`;
        break;
      default:
        break;
      }

      const dataJson = await fetch(`${api + endpoint}`);
      const data = await dataJson.json();

      const firstCard = 0;
      const maxCards = 12;
      const typeOfFetch = (category === 'comidas')
        ? 'meals'
        : 'drinks';
      const slicedResults = (data[typeOfFetch] <= maxCards)
        ? data[typeOfFetch]
        : data[typeOfFetch].slice(firstCard, maxCards);

      setItems({ [typeOfFetch]: slicedResults });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    initSearch();
  }, [filters]);

  return setFilters;
}
