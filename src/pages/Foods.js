import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import RecipesAppContext from '../context/RecipesAppContext';
import { initialRecipes } from '../services';

function Foods({ title }) {
  const { setRecipes, isFetching, setIsFetching } = useContext(RecipesAppContext);

  // const initialRecipes = async () => {
  //   const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //   const json = await response.json();
  //   setRecipes(json.meals);
  // };

  useEffect(() => {
    initialRecipes(setRecipes);
    setIsFetching(false);
  }, []);

  if (isFetching) {
    return <span> Loading...</span>;
  }

  return (
    <div>
      <Card title={ title } />
    </div>
  );
}

Foods.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Foods;
