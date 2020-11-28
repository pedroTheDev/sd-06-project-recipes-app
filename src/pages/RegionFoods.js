import React, { useEffect, useState, useContext } from 'react';
import { fetchArea, fetchRecipes } from '../helpers/Helper';

import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';
import { Cards, Footer, Header } from '../components';

export default function RegionFoods() {
  document.title = 'Explorar Origem';
  const [area, setArea] = useState();
  const [results, setResults] = useState();
  const [search, setSearch] = useState('All');

  const { filters, setFilters } = useContext(RecipesContext);
  useSearch();

  useEffect(() => {
    async function fetch() {
      const response = await fetchArea();
      setArea(response);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const response = await fetchRecipes(search);
      setResults(response);
    }
    if (search !== 'All') {
      fetch();
    }
    if (search === 'All') {
      setResults();
      setFilters({ ...filters, category: 'comidas' });
    }
  }, [search]);

  function handleDropdown() {
    if (area) {
      return (
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setSearch(e.target.value) }
        >
          <option data-testid="All-option">All</option>
          {area.map((item, index) => (
            <option
              key={ index }
              data-testid={ `${item.strArea}-option` }
            >
              {item.strArea}
            </option>
          ))}
        </select>
      );
    }
  }

  function handleDropdownResults() {
    if (results) {
      return (
        results.map((item, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card"` }>
            <img
              src={ item.strMealThumb }
              alt="foto da rexeita"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          </div>
        ))
      );
    }
    return <Cards id="comidas" />;
  }

  return (
    <div>
      <Header />
      {handleDropdown()}
      {handleDropdownResults()}
      <Footer />
    </div>
  );
}
