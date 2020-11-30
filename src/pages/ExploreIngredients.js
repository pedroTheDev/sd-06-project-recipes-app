import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreCard from '../components/explore/ExploreCard';
import { fetchMealIngredients } from '../services';

const ZERO = 0;
const TWELVE = 12;

function ExploreFoodIngredients({ type }) {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    const { meals } = await fetchMealIngredients();
    setIngredients(meals.slice(ZERO, TWELVE));
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <section>
        {
          ingredients.map(({ strIngredient }, index) => (
            <ExploreCard
              key={ index }
              index={ index }
              name={ strIngredient }
              type={ type }
            />
          ))
        }
      </section>
      <Footer />
      { console.log('ING:', ingredients) }
    </>
  );
}

ExploreFoodIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreFoodIngredients;
