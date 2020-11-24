import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreButton from '../components/explore/ExploreButton';

function ExploreMealsOrDrinks({ type }) {
  return (
    <>
      <Header title={ type.toUpperCase() } />
      <nav>
        <ExploreButton
          title="Por Ingredientes"
          url={ `/explorar/${type}/ingredientes` }
          testId="explore-by-ingredient"
        />
        {
          (type === 'comidas')
          && <ExploreButton
            title="Por Local de Origem"
            url={ `/explorar/${type}/area` }
            testId="explore-by-area"
          />
        }
        {/* REQ.74 Precisa da pagina de detalhes */}
        <ExploreButton
          title="Me Surpreenda!"
          url=""
          testId="explore-surprise"
        />
      </nav>
      <Footer />
    </>
  );
}

ExploreMealsOrDrinks.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreMealsOrDrinks;
