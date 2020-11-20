export const dataApi = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const categoriesApi = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
