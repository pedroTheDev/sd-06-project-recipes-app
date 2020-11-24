import React from 'react';
import ExploreButton from '../components/explore/ExploreButton';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <main>
        <nav>
          <ExploreButton
            title="Explorar Comidas"
            url="/explorar/comidas"
            testId="explore-food"
          />
          <ExploreButton
            title="Explorar Bebidas"
            url="/explorar/bebidas"
            testId="explore-drinks"
          />
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
