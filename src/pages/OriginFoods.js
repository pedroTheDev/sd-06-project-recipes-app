import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';

const OriginFoods = () => {
  const { title, setTitle } = useContext(HeaderContext);
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const fetchAreas = async () => {
    const path = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const fetchThem = await fetch(path);
    const fetchThemJson = await fetchThem.json();
    const areasFounds = fetchThemJson.meals.map((item) => item.strArea);
    setAreas(areasFounds);
  };

  const fetchRecipes = async () => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelected}`;
    if (areaSelected === 'All') {
      url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';
    }
    const fetchThem = await fetch(url);
    const fetchThemJson = await fetchThem.json();
    const numberOfCards = 12;
    const zero = 0;
    const listOfRecipes = [];
    for (let index = zero; index < numberOfCards; index += 1) {
      if (fetchThemJson.meals[index] !== undefined) {
        listOfRecipes
          .push([fetchThemJson.meals[index].strMeal,
            fetchThemJson.meals[index].strMealThumb,
            fetchThemJson.meals[index].idMeal]);
      }
    }
    setRecipes(listOfRecipes);
  };

  const handleChange = (e) => {
    setAreaSelected(e.target.value);
  };

  useEffect(() => {
    setTitle('Explorar Origem');
    fetchAreas();
    fetchRecipes();
  }, [areaSelected]);

  return (
    <div className="main">
      <h1 style={ { textAlign: 'center' } }>
        { title }
      </h1>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        {areas.map((item) => (
          <option
            key={ item }
            value={ item }
            data-testid={ `${item}-option` }
          >
            { item }
          </option>
        ))}
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
      </select>
      <div className="card-container">
        {recipes.map((item, index) => (
          <Link
            to={ `/comidas/${item[2]}` }
            key={ item[0] }
          >
            <div
              className="area-card"
              data-testid={ `${index}-recipe-card` }
              style={ { border: '1px solid black',
                marginTop: 20,
                borderRadius: 10,
                marginLeft: 5,
                padding: 10 } }
            >
              <img
                className="area-card-img"
                src={ item[1] }
                alt={ item[0] }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
                style={ { textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black' } }
              >
                { item[0] }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OriginFoods;
