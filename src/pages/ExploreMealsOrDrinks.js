import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreButton from '../components/explore/ExploreButton';

function ExploreMealsOrDrinks({ type }) {
  return (
    <>
      <Header title="Comidas" />
      <nav>
        <ExploreButton
          title="Por Ingredientes"
          url="/explorar/comidas/ingredientes"
          testId="explore-by-ingredient"
        />
        {
          (type === 'comidas')
          && <ExploreButton
          title="Por Local de Origem"
          url="/explorar/comidas/area"
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

export default ExploreMealsOrDrinks;
