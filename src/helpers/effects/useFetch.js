import { useEffect } from 'react';
import { handleAPIResponse } from '../APIRequests';

export default function useFetch(
  title,
  inputText,
  radioSearchSelection,
  dispatchRecipes,
  isFetchin,
  dispatchFetching,
  fetchmap,
  recipe,
) {
  useEffect(() => {
    async function fetchData() {
      const fetchByTypeAndText = fetchmap[title][radioSearchSelection];
      const recipesAPIData = await fetchByTypeAndText(inputText);
      console.log('effect-- apiData', recipesAPIData);
      handleAPIResponse(recipesAPIData, dispatchRecipes, recipe);
      dispatchFetching(false);
    }
    if (isFetchin) {
      fetchData();
    }
  }, [isFetchin]);
}

export function useFetchOnMount(fetchmap, title, dispatchRecipes, setIsLoading) {
  useEffect(() => {
    async function fetchData() {
      const fetchAllfoods = fetchmap[title].all;
      const recipesAPIData = await fetchAllfoods();
      console.log('primeira requisição', 'page:', title);
      dispatchRecipes(recipesAPIData);
      setIsLoading(false);
    }
    fetchData();
  }, []);
}
